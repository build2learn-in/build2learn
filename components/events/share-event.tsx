"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  TwitterIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  LinkIcon, 
  CheckIcon 
} from "lucide-react";
import { toast } from "sonner";

interface ShareEventProps {
  title: string;
  slug: string;
}

export function ShareEvent({ title, slug }: ShareEventProps) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/events/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => window.open(shareLinks.twitter, "_blank")}
      >
        <TwitterIcon className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
      >
        <LinkedinIcon className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => window.open(shareLinks.facebook, "_blank")}
      >
        <FacebookIcon className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={copyLink}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-600" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
}
