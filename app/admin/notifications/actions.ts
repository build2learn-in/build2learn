"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache"
import { createTransport } from "nodemailer"
import ical from "ical-generator"

export type NotificationStatus = "WAITLISTED" | "APPROVED" | "REJECTED";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: Date;
  slug: string;
  status: string;
};

export type Registration = {
  id: string;
  user: {
    email: string;
    name: string;
  };
  event: Event;
  status: NotificationStatus;
  notificationSent: boolean;
};

const transporter = createTransport({
  // host: process.env.SMTP_HOST,
  // port: Number(process.env.SMTP_PORT),
  // secure: true,
  // requireTLS: true,
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function getFutureEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    where: {
      eventDate: {
        gt: new Date(),
      },
      status: "PUBLISHED",
    },
    orderBy: {
      eventDate: "asc",
    },
  });
  return events;
}

export async function getEventRegistrations(eventId: string, status: NotificationStatus[]): Promise<Registration[]> {
  const registrations = await prisma.registration.findMany({
    where: {
      eventId,
      status: {
        in: status,
      },
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      event: true,
    },
  });
  return registrations;
}

function generateICSFile(event: Event): string {
  const calendar = ical({
    name: event.title,
    events: [{
      start: event.eventDate,
      end: new Date(event.eventDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours duration
      summary: event.title,
      description: event.description,
      location: event.location
    }]
  });

  return calendar.toString();
}

interface NotificationFormData {
  eventId: string;
  subject: string;
  message: string;
  includeCalendar: boolean;
  recipients?: string[];
}

function validateNotificationData(data: NotificationFormData) {
  if (!data.eventId) throw new Error("Event is required");
  if (!data.subject.trim()) throw new Error("Subject is required");
  if (!data.message.trim()) throw new Error("Message is required");
}

export async function sendPreview(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const data: NotificationFormData = {
    eventId: formData.get("eventId") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    includeCalendar: formData.get("includeCalendar") === "true"
  };

  try {
    validateNotificationData(data);
    
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    let attachments = [];
    if (data.includeCalendar) {
      const icsContent = generateICSFile(event);
      if (icsContent) {
        attachments.push({
          filename: `${event.slug}.ics`,
          content: icsContent,
          contentType: "text/calendar",
        });
      }
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: session.user.email,
      subject: `[PREVIEW] ${data.subject}`,
      text: data.message,
      attachments,
    });

    return { success: true };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to send preview");
  }
}

export async function sendNotification(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const data: NotificationFormData = {
    eventId: formData.get("eventId") as string,
    recipients: (formData.get("recipients") as string).split(",") as NotificationStatus[],
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    includeCalendar: formData.get("includeCalendar") === "true"
  };

  try {
    validateNotificationData(data);
    if (!data.recipients?.length) {
      throw new Error("At least one recipient group is required");
    }

    const [registrations, event] = await Promise.all([
      getEventRegistrations(data.eventId, data.recipients),
      prisma.event.findUnique({ where: { id: data.eventId } })
    ]);

    if (!event) {
      throw new Error("Event not found");
    }

    if (!registrations.length) {
      throw new Error("No recipients found for the selected criteria");
    }

    let attachments = [];
    if (data.includeCalendar) {
      const icsContent = generateICSFile(event);
      if (icsContent) {
        attachments.push({
          filename: `${event.slug}.ics`,
          content: icsContent,
          contentType: "text/calendar",
        });
      }
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL_FROM,
      to: session.user.email,
      bcc: registrations.map(r => r.user.email).filter(Boolean),
      subject: data.subject,
      text: data.message,
      attachments,
      headers: {
        "From": process.env.SMTP_EMAIL_FROM
      }
    });

    // Update notification sent status
    await prisma.registration.updateMany({
      where: {
        id: {
          in: registrations.map(r => r.id),
        },
      },
      data: {
        notificationSent: true,
      },
    });

    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to send notification");
  }
}
