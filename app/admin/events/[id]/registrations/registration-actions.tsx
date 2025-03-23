"use client"

import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react"
import { updateRegistrationStatus } from "./actions"
import { type Registration } from "./types"

interface RegistrationActionsProps {
  registration: Registration
}

export function RegistrationActions({ registration }: RegistrationActionsProps) {
  const handleAction = async (action: "APPROVED" | "REJECTED") => {
    await updateRegistrationStatus(registration.id, action)
  }

  if (registration.status !== "WAITLISTED") {
    return null
  }

  return (
    <div className="flex justify-end gap-2">
      <form action={() => handleAction("APPROVED")}>
        <Button 
          variant="outline"
          size="sm"
          type="submit"
          className="h-8 w-8 p-0"
        >
          <CheckIcon className="h-4 w-4" />
          <span className="sr-only">Approve</span>
        </Button>
      </form>
      <form action={() => handleAction("REJECTED")}>
        <Button 
          variant="destructive"
          size="sm"
          type="submit"
          className="h-8 w-8 p-0"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      </form>
    </div>
  )
}
