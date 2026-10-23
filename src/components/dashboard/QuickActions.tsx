
"use client";
import Link from "next/link";
import { BriefcaseBusiness, CalendarDays, ChevronRight, Download, Users } from "lucide-react";

const actions = [
  { title: "Review approvals", description: "12 employers pending", href: "/people", icon: Users },
  { title: "Manage job fairs", description: "3 upcoming events", href: "/job-fairs", icon: CalendarDays },
  { title: "View applications", description: "24 require review", href: "/jobs", icon: BriefcaseBusiness },
];

export function QuickActions() {
  return <section className="rounded-2xl border border-[#e9e1ef] bg-white p-5 md:p-6">
    <h2 className="font-medium">Quick actions</h2><p className="mt-1 text-xs text-[#9a8da5]">Common admin tasks</p>
    <div className="mt-4 divide-y divide-[#eee8f2]">{actions.map(({ title, description, href, icon: Icon }) => <Link key={title} href={href} className="flex items-center gap-3 py-3 first:pt-1 last:pb-1"><span className="rounded-xl bg-[#f3eafa] p-2.5 text-[#7627b5]"><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{title}</span><span className="mt-1 block text-[11px] text-[#9a8da5]">{description}</span></span><ChevronRight size={17} className="text-[#9a8da5]" /></Link>)}</div>
    <button onClick={() => alert("CSV export can be connected to real data later.")} className="mt-4 flex w-full items-center gap-3 border-t border-[#eee8f2] pt-4 text-left"><span className="rounded-xl bg-[#f3eafa] p-2.5 text-[#7627b5]"><Download size={19} /></span><span className="flex-1"><span className="block text-xs font-semibold">Export report</span><span className="mt-1 block text-[11px] text-[#9a8da5]">Download as CSV</span></span><ChevronRight size={17} className="text-[#9a8da5]" /></button>
  </section>;
}
