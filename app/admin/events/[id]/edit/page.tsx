"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, ArrowLeftIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { updateEvent, getEvent } from "../../[id]/actions";

type EventFormData = {
  title: string;
  slug: string;
  description: string;
  eventDate: Date;
  registrationDeadline: Date;
  location: string | null;
  maxParticipants: number | null;
  status: "DRAFT" | "PUBLISHED";
};

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    slug: "",
    description: "",
    eventDate: new Date(),
    registrationDeadline: new Date(),
    location: null,
    maxParticipants: null,
    status: "DRAFT",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      const resolvedParams = await params;
      try {
        const event = await getEvent(resolvedParams.id);
        if (event) {
          setFormData({
            ...event,
            eventDate: new Date(event.eventDate),
            registrationDeadline: new Date(event.registrationDeadline),
          });
        }
      } catch (error) {
        toast.error("Failed to load event");
        router.push("/admin/events");
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [params, router]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.description || !formData.eventDate || !formData.registrationDeadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const resolvedParams = await params;
    try {
      const result = await updateEvent({
        id: resolvedParams.id,
        ...formData,
        eventDate: formData.eventDate.toISOString(),
        registrationDeadline: formData.registrationDeadline.toISOString(),
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Event updated successfully");
      router.push("/admin/events");
    } catch (error) {
      toast.error("Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/events">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Update Event
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Enter the basic information about your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                placeholder="Enter event title" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Event Slug</Label>
              <Input 
                id="slug" 
                placeholder="event-slug" 
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /events/event-slug
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter event description" 
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Schedule</CardTitle>
            <CardDescription>
              Set the date, time, and registration deadline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Event Date</Label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <DatePicker 
                  date={formData.eventDate}
                  onSelect={(date) => date && setFormData({ ...formData, eventDate: date })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Registration Deadline</Label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <DatePicker 
                  date={formData.registrationDeadline}
                  onSelect={(date) => date && setFormData({ ...formData, registrationDeadline: date })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Enter event location" 
                value={formData.location ?? ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value || null })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input 
                id="maxParticipants" 
                type="number" 
                placeholder="Enter maximum number of participants" 
                value={formData.maxParticipants ?? ""}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value ? parseInt(e.target.value) : null })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
