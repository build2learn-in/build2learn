import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShareEvent } from "@/components/events/share-event";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon } from "lucide-react";
import { PatternBackground } from "@/components/ui/pattern-background";
import RegisterEventForm from "./register-form";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const event = await prisma.event.findUnique({
    where: { 
      slug: params.slug,
      status: "PUBLISHED"
    },
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
      registrations: session ? {
        where: {
          userId: session.user.id,
        },
      } : false,
    },
  });

  if (!event) {
    notFound();
  }

  const isRegistered = event.registrations && event.registrations.length > 0;
  const isRegistrationOpen = new Date() <= new Date(event.registrationDeadline);
  const isFull = event.maxParticipants ? event._count.registrations >= event.maxParticipants : false;

  // Get waitlist info if user is registered
  let waitlistInfo = null;
  if (isRegistered && event.registrations[0].status === "WAITLISTED") {
    waitlistInfo = {
      position: event.registrations[0].waitlistPosition,
      total: await prisma.registration.count({
        where: {
          eventId: event.id,
          status: "WAITLISTED",
        },
      }),
    };
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="relative h-[300px] md:h-[400px] bg-black backdrop-blur-xl">
        <PatternBackground />
        <div className="container h-full px-8">
          <div className="relative h-full flex items-center max-w-4xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-black/50 backdrop-blur-xl border-white/20 text-white">
                    {isRegistrationOpen ? "Upcoming Event" : "Past Event"}
                  </Badge>
                  {isRegistered && (
                    <Badge variant={
                      event.registrations[0].status === "WAITLISTED" 
                        ? "outline" 
                        : event.registrations[0].status === "APPROVED"
                        ? "default"
                        : event.registrations[0].status === "REJECTED"
                        ? "destructive"
                        : "secondary"
                    } className="bg-black/50 backdrop-blur-xl border-white/20 text-white">
                      {event.registrations[0].status === "WAITLISTED"
                        ? `Waitlist #${waitlistInfo?.position}`
                        : event.registrations[0].status === "APPROVED"
                        ? "Approved"
                        : event.registrations[0].status === "REJECTED"
                        ? "Rejected"
                        : "Pending Approval"}
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-glow">{event.title}</h1>
                <div className="flex items-center gap-4 pt-2">
                  <ShareEvent title={event.title} slug={params.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl">
          <div className="md:col-span-2 space-y-8">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{event.description}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.eventDate), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Registration Deadline</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.registrationDeadline), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              {event.maxParticipants && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Available Spots</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.maxParticipants - event._count.registrations} of {event.maxParticipants} spots remaining
                      {isFull && (
                        <span className="block text-yellow-600">Waitlist available</span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg border p-6 space-y-6 sticky top-20">
              {!session ? (
                <Button asChild className="w-full">
                  <Link href="/api/auth/signin">Sign in to Register</Link>
                </Button>
              ) : isRegistered ? (
                <div className="text-center space-y-2">
                  {event.registrations[0].status === "WAITLISTED" ? (
                    <>
                      <p className="text-yellow-600 font-medium">You are on the waitlist</p>
                      <p className="text-sm text-muted-foreground">
                        Position #{waitlistInfo?.position} of {waitlistInfo?.total}
                      </p>
                    </>
                  ) : event.registrations[0].status === "APPROVED" ? (
                    <p className="text-primary font-medium">You are registered for this event!</p>
                  ) : event.registrations[0].status === "REJECTED" ? (
                    <p className="text-destructive font-medium">Your registration has been rejected</p>
                  ) : (
                    <p className="text-primary font-medium">You are registered for this event!</p>
                  )}
                </div>
              ) : !isRegistrationOpen ? (
                <p className="text-center text-destructive font-medium">Registration is closed</p>
              ) : (
                <RegisterEventForm eventId={event.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}