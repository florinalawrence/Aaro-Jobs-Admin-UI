"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Search,
  Users,
  WalletCards,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    children: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics & Reports", href: "/analytics" },
    ],
  },
  {
    label: "People & Companies",
    href: "/people",
    icon: Users,
    children: [
      { label: "Candidates", href: "/candidates" },
      { label: "Employers", href: "/employers" },
      { label: "Roles & Permissions", href: "/roles" },
    ],
  },
  {
    label: "Jobs & Applications",
    href: "/jobs",
    icon: BriefcaseBusiness,
    children: [
      { label: "Jobs", href: "/jobs" },
      { label: "Applications", href: "/applications" },
      { label: "AI & Skills", href: "/ai-skills" },
    ],
  },
  {
    label: "Job Fairs",
    href: "/job-fairs",
    icon: CalendarDays,
    children: [
      { label: "Events", href: "/events" },
      { label: "Registration", href: "/registration" },
      { label: "Booths & Venues", href: "/booths" },
    ],
  },
  {
    label: "Finance & Content",
    href: "/finance-content",
    icon: WalletCards,
    children: [
      { label: "Payments", href: "/payments" },
      { label: "CMS", href: "/cms" },
    ],
  },
  {
    label: "Communication",
    href: "/communication",
    icon: MessageSquare,
    children: [
      { label: "Notifications", href: "/notifications" },
      { label: "Email Campaigns", href: "/email-campaigns" },
      { label: "Languages", href: "/languages" },
    ],
  },
  {
    label: "System",
    href: "/system",
    icon: Settings,
    children: [
      { label: "Audit Logs", href: "/audit-logs" },
      { label: "Platform Settings", href: "/platform-settings" },
    ],
  },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>("Overview");

  // Automatically expand the parent menu for the current route.
  useEffect(() => {
    const activeMenu = navItems.find(
      (item) =>
        item.href === pathname ||
        item.children.some((child) => child.href === pathname),
    );

    if (activeMenu) {
      setOpenMenu(activeMenu.label);
    }
  }, [pathname]);

  const handleMainMenuClick = (item: (typeof navItems)[number]) => {
    if (openMenu === item.label) {
      setOpenMenu(null);
      return;
    }

    setOpenMenu(item.label);
    setMobileOpen(false);

    const firstSubmenu = item.children[0];

    if (firstSubmenu && pathname !== firstSubmenu.href) {
      router.push(firstSubmenu.href);
    }
  };

  const currentSection =
    navItems.find(
      (item) =>
        item.href === pathname ||
        item.children.some((child) => child.href === pathname),
    )?.label ?? "Dashboard";

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile navigation overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 flex h-screen w-[258px] flex-col overflow-hidden bg-[#21132b] text-white transition-transform md:sticky md:top-0 md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-[96px] shrink-0 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7627b5] text-xl font-bold">
            A
          </div>

          <div>
            <div className="text-xs font-bold tracking-wide">AARO JOBS</div>
            <div className="mt-1 text-[10px] tracking-[0.2em] text-purple-200">
              ADMIN PANEL
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === pathname ||
              item.children.some((child) => child.href === pathname);

            const expanded = openMenu === item.label;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => handleMainMenuClick(item)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3
                    text-left text-sm transition-colors
                    ${
                      active
                        ? "bg-[#7627b5] text-white"
                        : "text-purple-100 hover:bg-white/10"
                    }`}
                >
                  <Icon size={19} className="shrink-0" />

                  <span className="min-w-0 flex-1">{item.label}</span>

                  {expanded ? (
                    <ChevronDown size={16} className="shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="shrink-0" />
                  )}
                </button>

                {/* Submenu */}
                {expanded && (
                  <div className="ml-5 mt-2 space-y-1 border-l border-white/10 pl-3">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={childActive ? "page" : undefined}
                          className={`flex items-center rounded-lg px-3 py-2.5 text-xs transition-colors
                            ${
                              childActive
                                ? "bg-white/10 font-semibold text-white"
                                : "text-purple-200/75 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                          <span
                            className={`mr-2 inline-block w-2 shrink-0 text-center ${
                              childActive ? "text-purple-300" : "opacity-0"
                            }`}
                          >
                            •
                          </span>

                          <span className="leading-5">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="shrink-0 border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0e7f7] text-xs font-semibold text-[#7627b5]">
              AD
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                Admin User
              </p>
              <p className="truncate text-[10px] text-purple-200/70">
                admin@aarojobs.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e9e1ef] bg-white px-5 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              ☰
            </button>

            <span className="shrink-0 text-sm text-[#81768b]">Aaro Jobs</span>

            <ChevronRight size={14} className="shrink-0 text-[#b7a9c2]" />

            <span className="truncate text-sm font-medium">
              {currentSection}
            </span>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="text-[#81768b] hover:text-[#7627b5]"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="relative text-[#81768b] hover:text-[#7627b5]"
            >
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#7627b5]" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e7f7] text-xs font-semibold text-[#7627b5]">
                AD
              </div>

              <span className="hidden text-sm sm:inline">Admin</span>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)] p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
