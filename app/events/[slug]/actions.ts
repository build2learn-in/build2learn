"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const registrationSchema = z.object({
  eventId: z.string(),
  participationType: z.enum(["HAS_IDEA", "NEEDS_HELP", "WANTS_TO_HELP"]),
  ideaDescription: z.string().optional(),
});

export async function registerForEvent(formData: z.infer<typeof registrationSchema>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You must be signed in to register for events" };
  }

  const validatedFields = registrationSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if event exists and is open for registration
    const event = await prisma.event.findUnique({
      where: { 
        id: formData.eventId,
        status: "PUBLISHED",
      },
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: {
                  in: ["APPROVED", "REGISTERED"]
                }
              }
            },
          },
        },
      },
    });

    if (!event) {
      return { error: "Event not found" };
    }

    if (new Date() > new Date(event.registrationDeadline)) {
      return { error: "Registration is closed for this event" };
    }

    // Check if user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: formData.eventId,
          userId: session.user.id,
        },
      },
    });

    if (existingRegistration) {
      return { error: "You are already registered for this event" };
    }

    // Check if event is at capacity
    const isEventFull = event.maxParticipants ? event._count.registrations >= event.maxParticipants : false;

    // Get current waitlist position if event is full
    let waitlistPosition: number | null = null;
    if (isEventFull) {
      const lastWaitlistPosition = await prisma.registration.findFirst({
        where: {
          eventId: formData.eventId,
          status: "WAITLISTED",
        },
        orderBy: {
          waitlistPosition: 'desc',
        },
        select: {
          waitlistPosition: true,
        },
      });

      waitlistPosition = (lastWaitlistPosition?.waitlistPosition || 0) + 1;
    }

    // Create registration
    await prisma.registration.create({
      data: {
        eventId: formData.eventId,
        userId: session.user.id,
        participationType: formData.participationType,
        ideaDescription: formData.ideaDescription,
        status: isEventFull ? "WAITLISTED" : "REGISTERED",
        waitlistPosition: waitlistPosition,
      },
    });

    revalidatePath(`/events/${event.slug}`);
    return { 
      success: true,
      isWaitlisted: isEventFull,
      waitlistPosition: waitlistPosition,
    };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return {
      error: "Failed to register for event",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Add a function to handle waitlist promotions when someone cancels
export async function promoteFromWaitlist(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: {
                  in: ["APPROVED", "REGISTERED"]
                }
              }
            },
          },
        },
      },
    });

    if (!event?.maxParticipants) return;

    if (event._count.registrations >= event.maxParticipants) return;

    // Get next person on waitlist
    const nextInLine = await prisma.registration.findFirst({
      where: {
        eventId,
        status: "WAITLISTED",
      },
      orderBy: {
        waitlistPosition: 'asc',
      },
    });

    if (!nextInLine) return;

    // Promote the next person
    await prisma.registration.update({
      where: { id: nextInLine.id },
      data: {
        status: "REGISTERED",
        waitlistPosition: null,
        notificationSent: false, // Reset notification status so they get notified of promotion
      },
    });

    // Reorder remaining waitlist
    await prisma.registration.updateMany({
      where: {
        eventId,
        status: "WAITLISTED",
        waitlistPosition: {
          gt: nextInLine.waitlistPosition!,
        },
      },
      data: {
        waitlistPosition: {
          decrement: 1,
        },
      },
    });

    revalidatePath(`/events/${event.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to promote from waitlist:", error);
    return {
      error: "Failed to promote from waitlist",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
} 