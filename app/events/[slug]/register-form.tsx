"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { registerForEvent } from "./actions";

export default function RegisterEventForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    participationType: "",
    ideaDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.participationType) {
      toast.error("Please select your participation type");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerForEvent({
        eventId,
        participationType: formData.participationType as "HAS_IDEA" | "NEEDS_HELP" | "WANTS_TO_HELP",
        ideaDescription: formData.ideaDescription,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.isWaitlisted) {
        setWaitlistPosition(result.waitlistPosition);
        setShowWaitlistDialog(true);
      } else {
        toast.success("Successfully registered for the event!");
      }
      
      router.refresh();
    } catch (error) {
      toast.error("Failed to register for the event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="participationType">How would you like to participate?</Label>
          <Select
            value={formData.participationType}
            onValueChange={(value) => setFormData({ ...formData, participationType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your participation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HAS_IDEA">I have a project idea</SelectItem>
              <SelectItem value="NEEDS_HELP">I need help with my project</SelectItem>
              <SelectItem value="WANTS_TO_HELP">I want to help others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(formData.participationType === "HAS_IDEA" || formData.participationType === "NEEDS_HELP") && (
          <div className="space-y-2">
            <Label htmlFor="ideaDescription">Describe your project idea</Label>
            <Textarea
              id="ideaDescription"
              placeholder="Tell us about your project idea..."
              value={formData.ideaDescription}
              onChange={(e) => setFormData({ ...formData, ideaDescription: e.target.value })}
              rows={4}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Register for Event
        </Button>
      </form>

      <Dialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Added to Waitlist</DialogTitle>
            <DialogDescription className="pt-4">
              <p>
                The event is currently at full capacity. You have been added to the waitlist at position #{waitlistPosition}.
              </p>
              <p className="mt-2">
                We will notify you if a spot becomes available. You can check your position on the waitlist at any time by visiting the event page.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
} 