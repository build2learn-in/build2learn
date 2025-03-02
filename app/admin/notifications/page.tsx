"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, SendIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { getFutureEvents, sendPreview, sendNotification } from "./actions";
import type { Event, NotificationStatus } from "./actions";

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<NotificationStatus[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(`Dear Participant,

We're excited to confirm your participation in the upcoming event!

Event Details:
- Date: [Event Date]
- Time: [Event Time]
- Location: [Event Location]

Please find attached a calendar invitation for your convenience.

Looking forward to seeing you there!

Best regards,
The Event Team`);
  const [includeCalendar, setIncludeCalendar] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const futureEvents = await getFutureEvents();
        setEvents(futureEvents);
      } catch (error) {
        setError("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handlePreview = async () => {
    if (isSending) return;
    setIsSending(true);

    const formData = new FormData();
    formData.append("eventId", selectedEvent);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("includeCalendar", includeCalendar.toString());

    try {
      await sendPreview(formData);
      toast.success("Preview sent!", {
        description: "Check your email for the preview."
      });
    } catch (error) {
      setError("Error sending preview");
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = async () => {
    if (isSending) return;
    setIsSending(true);

    const formData = new FormData();
    formData.append("eventId", selectedEvent);
    formData.append("recipients", selectedRecipients.join(","));
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("includeCalendar", includeCalendar.toString());

    try {
      await sendNotification(formData);
      toast.success("Success!", {
        description: "Notifications sent successfully."
      });
      
      // Reset form
      setSelectedRecipients([]);
      setSubject("");
      setMessage("");
    } catch (error) {
      setError("Error sending notifications");
    } finally {
      setIsSending(false);
    }
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);
  
  const recipientOptions: { id: NotificationStatus; label: string }[] = [
    { id: "WAITLISTED", label: "Waitlisted Participants" },
    { id: "APPROVED", label: "Approved Participants" },
    { id: "REJECTED", label: "Rejected Participants" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Send notifications to event participants
        </p>
      </div>
      
      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Notification</CardTitle>
              <CardDescription>
                Send a notification to event participants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event">Event</Label>
                <Select
                  value={selectedEvent}
                  onValueChange={(value) => {
                    setSelectedEvent(value);
                    if (selectedEventData) {
                      setMessage(message
                        .replace("[Event Date]", new Date(selectedEventData.eventDate).toLocaleDateString())
                        .replace("[Event Time]", new Date(selectedEventData.eventDate).toLocaleTimeString())
                        .replace("[Event Location]", selectedEventData.location || "[Location TBD]")
                      );
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="space-y-2">
                  {recipientOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={selectedRecipients.includes(option.id)}
                        onCheckedChange={(checked) => {
                          setSelectedRecipients(prev =>
                            checked
                              ? [...prev, option.id]
                              : prev.filter(r => r !== option.id)
                          );
                        }}
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message" 
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="calendar"
                    checked={includeCalendar}
                    onCheckedChange={(checked) => setIncludeCalendar(!!checked)}
                  />
                  <Label htmlFor="calendar">Include calendar invitation (.ics file)</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  disabled={!selectedEvent || !subject || !message || isSending}
                >
                  {isSending ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <EyeIcon className="mr-2 h-4 w-4" />
                  )}
                  Preview
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!selectedEvent || selectedRecipients.length === 0 || !subject || !message || isSending}
                >
                  {isSending ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <SendIcon className="mr-2 h-4 w-4" />
                  )}
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>
                View previously sent notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No notifications sent yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}