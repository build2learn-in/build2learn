"use server";

import { prisma } from "@/lib/prisma";

type DashboardStats = {
  totalEvents: number;
  latestPublishedEvent: {
    title: string;
    registrations: any[];
    _count: {
      registrations: number;
    };
  } | null;
  totalParticipants: number;
  notificationsSent: number;
  pendingRegistrations: number;
} | null;

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get total events count
    const totalEvents = await prisma.event.count();

    // Get latest published event stats
    const latestPublishedEvent = await prisma.event.findFirst({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        eventDate: 'desc',
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
        registrations: {
          where: {
            isApproved: false,
          },
        },
      },
    });

    // Get total participants (approved registrations)
    const totalParticipants = await prisma.registration.count({
      where: {
        isApproved: true,
      },
    });

    // Get total notifications sent
    const notificationsSent = await prisma.registration.count({
      where: {
        notificationSent: true,
      },
    });

    // Get pending registrations count
    const pendingRegistrations = await prisma.registration.count({
      where: {
        isApproved: false,
      },
    });

    return {
      totalEvents,
      latestPublishedEvent,
      totalParticipants,
      notificationsSent,
      pendingRegistrations,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return null;
  }
}

type DashboardEvent = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  _count: {
    registrations: number;
  };
};

export async function getRecentEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    return { events: events as DashboardEvent[] };
  } catch (error) {
    console.error("Failed to fetch recent events:", error);
    return { events: [] };
  }
}

type DashboardRegistration = {
  id: string;
  isApproved: boolean;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
  event: {
    title: string;
    slug: string;
  };
};

export async function getRecentRegistrations() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    return { registrations: registrations as DashboardRegistration[] };
  } catch (error) {
    console.error("Failed to fetch recent registrations:", error);
    return { registrations: [] };
  }
} 