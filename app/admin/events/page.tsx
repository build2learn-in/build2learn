import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, UsersIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getEvents, deleteEvent, updateEventStatus } from "./actions";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Manage Events",
  description: "Create and manage events",
};

// Define the Event type
type Event = {
  id: string;
  title: string;
  slug: string;
  eventDate: Date;
  registrationDeadline: Date;
  status: "DRAFT" | "PUBLISHED";
  maxParticipants?: number | null;
  _count: {
    registrations: number;
  };
};

export default async function EventsPage() {
  const { events, error } = await getEvents();

  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const handleDeleteEvent = async (eventId: string) => {
    "use server";
    await deleteEvent(eventId);
    revalidatePath("/admin/events");
  };

  const handleUpdateStatus = async (eventId: string, newStatus: "DRAFT" | "PUBLISHED") => {
    "use server";
    await updateEventStatus(eventId, newStatus);
    revalidatePath("/admin/events");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Create and manage your events
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Registration Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  Error loading events: {error}
                </TableCell>
              </TableRow>
            ) : !events || events.length === 0 ? (
              <TableRow>
                <TableCell className="font-medium">No events found</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : (
              events.map((event: Event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{formatDate(event.eventDate)}</TableCell>
                  <TableCell>{formatDate(event.registrationDeadline)}</TableCell>
                  <TableCell>
                    {event.status === "DRAFT" ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Draft
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Published
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{event._count.registrations}/{event.maxParticipants}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <form>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link href={`/events/${event.slug}`}>
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </form>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/admin/events/${event.id}/registrations`}>
                          <UsersIcon className="h-4 w-4" />
                          <span className="sr-only">View Registrations</span>
                        </Link>
                      </Button>
                      
                      <form action={handleUpdateStatus.bind(null, event.id, event.status === "DRAFT" ? "PUBLISHED" : "DRAFT")}>
                        <Button 
                          variant={event.status === "DRAFT" ? "outline" : "secondary"} 
                          size="sm"
                          type="submit"
                        >
                          {event.status === "DRAFT" ? "Publish" : "Unpublish"}
                        </Button>
                      </form>
                      
                      <form action={handleDeleteEvent.bind(null, event.id)}>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          type="submit"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 