"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.date(),
  registrationDeadline: z.date(),
  location: z.string().optional(),
  maxParticipants: z.number().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type EventFormData = z.infer<typeof eventSchema>;

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        eventDate: 'desc',
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });
    
    return { events };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { error: "Failed to fetch events" };
  }
}

export async function createEvent(formData: EventFormData) {
  const validatedFields = eventSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const event = await prisma.event.create({
      data: validatedFields.data,
    });

    revalidatePath("/admin/events");
    return { success: true, eventId: event.id };
  } catch (error) {
    return {
      error: "Failed to create event",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateEventStatus(eventId: string, status: "DRAFT" | "PUBLISHED") {
  try {
    await prisma.event.update({
      where: { id: eventId },
      data: { status },
    });

    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to update event status",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to delete event",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
} 