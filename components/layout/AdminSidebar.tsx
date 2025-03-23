"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CalendarIcon, 
  UsersIcon, 
  MailIcon, 
  LayoutDashboardIcon,
  ClipboardCheckIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: CalendarIcon,
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: MailIcon,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
      </div>
      <nav className="space-y-1">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-slate-200 text-slate-900"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 