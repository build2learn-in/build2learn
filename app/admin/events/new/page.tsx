"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, ArrowLeftIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createEvent } from "../actions";

// export const metadata = {
//   title: "Create Event",
//   description: "Create a new event",
// };

type EventFormData = {
  title: string;
  slug: string;
  description: string;
  eventDate: Date;
  registrationDeadline: Date;
  location?: string;
  maxParticipants?: number;
  status: "DRAFT" | "PUBLISHED";
};

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<EventFormData>>({
    status: "DRAFT",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    if (!formData.title || !formData.slug || !formData.description || !formData.eventDate || !formData.registrationDeadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createEvent({
        ...formData,
        status,
      } as EventFormData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(status === "DRAFT" ? "Event saved as draft" : "Event published successfully");
      router.push("/admin/events");
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/events">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSubmit("DRAFT")}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button 
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={isSubmitting}
          >
            Publish Event
          </Button>
        </div>
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
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Event Slug</Label>
              <Input 
                id="slug" 
                placeholder="event-slug" 
                value={formData.slug || ""}
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
                value={formData.description || ""}
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
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input 
                id="maxParticipants" 
                type="number" 
                placeholder="Enter maximum number of participants" 
                value={formData.maxParticipants || ""}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || undefined })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 