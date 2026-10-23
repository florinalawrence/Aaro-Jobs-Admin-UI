import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Grid2X2, Users } from "lucide-react";

const icons = { Candidates: Users, "Verified Employers": BriefcaseBusiness, "Active Jobs": CalendarDays, Applications: Grid2X2 };

export function StatCard({ label, value, change, tint, iconColor }: { label: keyof typeof icons; value: string; change: string; tint: string; iconColor: string }) {
  const Icon = icons[label];
  return <article className="rounded-2xl border border-[#e9e1ef] bg-white p-5 shadow-[0_3px_16px_rgba(40,20,55,0.025)]">
    <div className="flex items-start justify-between"><p className="text-xs text-[#81768b]">{label}</p><div className="rounded-xl p-2.5" style={{ backgroundColor: tint, color: iconColor }}><Icon size={20} /></div></div>
    <p className="mt-[-2px] text-3xl font-semibold tracking-tight text-[#24152f]">{value}</p>
    <p className="mt-3 flex items-center gap-1 text-[11px] text-[#0b8b65]"><ArrowUpRight size={13} /> <span className="font-semibold">{change}</span><span className="text-[#a196ad]">vs last month</span></p>
  </article>;
}
