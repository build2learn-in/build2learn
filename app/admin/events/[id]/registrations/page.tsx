import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { type Event } from "./types";
import { EventRegistrationsClient } from "./event-registrations-client";

async function getRegistrationStats() {
  const stats = await prisma.registration.groupBy({
    by: ['participationType'],
    _count: true,
  });
  
  return stats.reduce((acc: Record<string, number>, curr: { participationType: string; _count: number }) => {
    acc[curr.participationType] = curr._count;
    return acc;
  }, {});
}

export default async function EventRegistrationsPage({ params }: { params: { id: string } }) {
  // Await params before destructuring to access its properties
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id },
    include: {
      registrations: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const stats = await getRegistrationStats();

  return <EventRegistrationsClient event={event} stats={stats} />;
} 