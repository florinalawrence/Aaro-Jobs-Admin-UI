import { ChevronRight, Plus } from "lucide-react";

export function DashboardHeader() {
  return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7627b5]">Overview</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#24152f]">Dashboard</h1><p className="mt-2 text-sm text-[#81768b]">A clear view of platform performance and recent activity.</p></div>
    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7627b5] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5b168f]"><Plus size={17} /> Add record <ChevronRight size={16} /></button>
  </div>;
}
