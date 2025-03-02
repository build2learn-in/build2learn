import { Suspense } from "react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"

async function getPublishedEvents() {
  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED"
    },
    include: {
      _count: {
        select: {
          registrations: true
        }
      }
    },
    orderBy: {
      eventDate: 'asc'
    }
  })

  return events
}

function EventCard({ event }: { 
  event: Awaited<ReturnType<typeof getPublishedEvents>>[0] 
}) {
  const isUpcoming = new Date(event.eventDate) > new Date()
  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date()

  return (
    <Link href={`/events/${event.slug}`} className="block h-full">
      <Card className="h-full hover:bg-muted/50 transition-colors">
        <CardContent className="pt-6 flex flex-col h-full">
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg leading-none">{event.title}</h3>
                {!isUpcoming && (
                  <Badge variant="secondary">Past Event</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            </div>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 shrink-0" />
                <time dateTime={event.eventDate} className="line-clamp-1">
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 shrink-0" />
                <span className="line-clamp-1">
                  {event._count.registrations} registered
                  {event.maxParticipants && ` / ${event.maxParticipants} max`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 pb-6">
          {isUpcoming ? (
            <Badge variant={isRegistrationOpen ? "default" : "secondary"}>
              {isRegistrationOpen ? "Registration Open" : "Registration Closed"}
            </Badge>
          ) : (
            <Badge variant="outline">Event Completed</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default async function EventsPage() {
  const events = await getPublishedEvents()
  
  return (
    <div className="container px-8 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">Join our upcoming events or check out past events</p>
      </div>
      
      <Suspense fallback={
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-[280px] bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      }>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {events.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-lg font-medium">No events found</p>
              <p className="text-sm">Check back later for new events</p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  )
}
