"use client";

import Link from "next/link";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CheckIcon, XIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bulkUpdateRegistrationStatus } from "./actions";
import { columns } from "./columns";
import { type Registration, type Event } from "./types";

type EventRegistrationsClientProps = {
  event: Event;
  stats: Record<string, number>;
};

export function EventRegistrationsClient({ event, stats }: EventRegistrationsClientProps) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: event.registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleBulkAction = async (action: "APPROVED" | "REJECTED") => {
    const selectedRows = table.getSelectedRowModel().rows;
    const registrationIds = selectedRows.map(row => row.original.id);
    await bulkUpdateRegistrationStatus(registrationIds, action);
    setRowSelection({});
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <p className="text-muted-foreground">
              Manage event registrations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {table.getSelectedRowModel().rows.length > 0 && (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("APPROVED")}
                className="gap-2"
              >
                <CheckIcon className="h-4 w-4" />
                Approve Selected ({table.getSelectedRowModel().rows.length})
              </Button>
              <Button 
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction("REJECTED")}
                className="gap-2"
              >
                <XIcon className="h-4 w-4" />
                Reject Selected ({table.getSelectedRowModel().rows.length})
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {event._count.registrations} registration{event._count.registrations !== 1 ? 's' : ''}
            {event.maxParticipants ? ` of ${event.maxParticipants} spots` : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Has Idea</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.HAS_IDEA || 0}</div>
            <p className="text-xs text-muted-foreground">
              Participants with project ideas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Needs Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.NEEDS_HELP || 0}</div>
            <p className="text-xs text-muted-foreground">
              Participants seeking collaboration
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wants to Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.WANTS_TO_HELP || 0}</div>
            <p className="text-xs text-muted-foreground">
              Participants offering help
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No registrations yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}