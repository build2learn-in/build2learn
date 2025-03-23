import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UsersIcon, ClipboardCheckIcon, MailIcon } from "lucide-react";
import { getDashboardStats, getRecentEvents, getRecentRegistrations } from "./actions";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing events and participants",
};

type DashboardEvent = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  maxParticipants?: number | null;
  _count: {
    registrations: number;
  };
};

type DashboardRegistration = {
  id: string;
  isApproved: boolean;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
  event: {
    title: string;
    slug: string;
  };
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const { events } = await getRecentEvents();
  const { registrations } = await getRecentRegistrations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage events, registrations, and participants
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEvents || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.latestPublishedEvent ? `Latest: ${stats.latestPublishedEvent.title}` : 'No published events'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Registrations</CardTitle>
            <ClipboardCheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingRegistrations || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.latestPublishedEvent ? 
                `${stats.latestPublishedEvent.registrations.length} pending for latest event` : 
                'Review and approve registrations'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalParticipants || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.latestPublishedEvent ? 
                `${stats.latestPublishedEvent._count.registrations} in latest event` : 
                'No participants yet'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
            <MailIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.notificationsSent || 0}</div>
            <p className="text-xs text-muted-foreground">
              Manage event notifications
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Recently created or updated events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events found</p>
            ) : (
              <div className="space-y-4">
                {events.map((event: DashboardEvent) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Link 
                        href={`/admin/events/${event.id}/registrations`}
                        className="font-medium hover:underline"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          event.status === "DRAFT" 
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }>
                          {event.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {event._count.registrations}/{event.maxParticipants} registrations
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/events/${event.slug}`}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      View Event →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>
              Recently submitted registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No registrations found</p>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration: DashboardRegistration) => (
                  <div key={registration.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{registration.user.name || 'Anonymous'}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          registration.isApproved
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }>
                          {registration.isApproved ? 'Approved' : 'Pending'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(registration.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/events/${registration.event.slug}`}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      {registration.event.title} →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 