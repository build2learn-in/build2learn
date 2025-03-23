"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { RegistrationActions } from "./registration-actions"
import { type Registration } from "./types"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export const columns: ColumnDef<Registration>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => row.original.user.name || "Anonymous",
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "participationType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.participationType
      return (
        <Badge variant="outline">
          {type === "HAS_IDEA" ? "Has Idea" :
           type === "NEEDS_HELP" ? "Needs Help" :
           "Wants to Help"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          variant="outline"
          className={
            status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" :
            status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" :
            "bg-yellow-50 text-yellow-700 border-yellow-200"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "ideaDescription",
    header: "Idea Description",
    cell: ({ row }) => {
      const idea = row.original.ideaDescription
      if (!idea) return null
      
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="max-w-[200px] truncate text-sm cursor-pointer hover:text-blue-600 hover:underline">
              {idea}
            </div>
          </HoverCardTrigger>
          <HoverCardContent side="right" align="start" className="w-[450px] p-4 space-y-2">
            <div className="font-medium text-sm text-muted-foreground">Project Idea</div>
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {idea}
            </p>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPp"),
  },
  {
    id: "actions",
    cell: ({ row }) => <RegistrationActions registration={row.original} />,
  },
]
