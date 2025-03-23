"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatus(registrationId: string, newStatus: "APPROVED" | "REJECTED") {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: { 
        status: newStatus,
        notificationSent: false, // Reset notification status when approval status changes
      },
      include: {
        event: true,
      },
    });

    revalidatePath(`/admin/events/${registration.event.id}/registrations`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update registration status:", error);
    return {
      error: "Failed to update registration status",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function bulkUpdateRegistrationStatus(registrationIds: string[], newStatus: "APPROVED" | "REJECTED") {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.$transaction(
      registrationIds.map((id) =>
        prisma.registration.update({
          where: { id },
          data: { 
            status: newStatus,
            notificationSent: false,
          },
        })
      )
    );

    // Get the event ID from one of the registrations to revalidate the page
    const registration = await prisma.registration.findFirst({
      where: { id: registrationIds[0] },
      select: { eventId: true },
    });

    if (registration?.eventId) {
      revalidatePath(`/admin/events/${registration.eventId}/registrations`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update registration statuses:", error);
    return {
      error: "Failed to update registration statuses",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
} 