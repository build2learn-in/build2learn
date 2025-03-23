"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

interface EventFormData {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventDate: string | Date;
  registrationDeadline: string | Date;
  location: string | null;
  maxParticipants: number | null;
}

export async function getEvent(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
}

export async function updateEvent(formData: EventFormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { error: "Unauthorized" };
  }

  try {
    // Check if slug is already taken by another event
    const existingEvent = await prisma.event.findFirst({
      where: {
        slug: formData.slug,
        id: { not: formData.id }, // Exclude current event
      },
    });

    if (existingEvent) {
      return { error: "Slug is already taken" };
    }

    const event = await prisma.event.update({
      where: { id: formData.id },
      data: {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        eventDate: new Date(formData.eventDate),
        registrationDeadline: new Date(formData.registrationDeadline),
        location: formData.location,
        maxParticipants: formData.maxParticipants,
      },
    });

    revalidatePath("/admin/events");
    revalidatePath(`/events/${event.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { error: "Failed to update event" };
  }
}
