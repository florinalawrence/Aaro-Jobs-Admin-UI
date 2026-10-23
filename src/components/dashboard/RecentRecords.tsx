"use client";

import { Search, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const records = [
  { name: "Platform review", details: "Operations and quality", status: "Active", updated: "Today, 09:40" },
  { name: "Monthly performance", details: "Reporting period · June", status: "Complete", updated: "Yesterday" },
  { name: "Policy update", details: "Admin workflow", status: "Pending", updated: "Jun 16, 2025" },
];

export function RecentRecords() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => records.filter((r) => `${r.name} ${r.details} ${r.status}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const statusStyle: Record<string, string> = { Active: "bg-[#e5f5ef] text-[#14805e]", Complete: "bg-[#f0e7f7] text-[#7627b5]", Pending: "bg-[#fff0dc] text-[#b76a08]" };
  return <section className="overflow-hidden rounded-2xl border border-[#e9e1ef] bg-white">
    <div className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:px-6"><div><h2 className="font-medium">Recent dashboard</h2><p className="mt-1 text-xs text-[#9a8da5]">Latest records and changes</p></div><label className="flex items-center gap-2 rounded-lg border border-[#e9e1ef] px-3 py-2"><Search size={15} className="text-[#9a8da5]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records" className="w-full text-xs outline-none placeholder:text-[#a99db3] md:w-36" /></label></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-xs"><thead className="bg-[#faf8fc] text-[10px] uppercase tracking-wide text-[#81768b]"><tr><th className="px-5 py-3 md:px-6">Name / item</th><th className="px-5 py-3">Details</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Updated</th><th className="px-5 py-3"> </th></tr></thead><tbody>{filtered.map((record) => <tr key={record.name} className="border-t border-[#eee8f2]"><td className="px-5 py-4 font-semibold md:px-6">{record.name}</td><td className="px-5 py-4 text-[#81768b]">{record.details}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle[record.status]}`}>{record.status}</span></td><td className="px-5 py-4 text-[#81768b]">{record.updated}</td><td className="px-5 py-4"><button className="inline-flex items-center gap-1 font-semibold text-[#7627b5]" onClick={() => alert(`Selected: ${record.name}`)}>View <ChevronRight size={14} /></button></td></tr>)}</tbody></table></div>

<div className="flex items-center justify-between border-t border-[#eee8f2] px-5 py-3 text-xs md:px-6">
  <span className="text-[#9a8da5]">
    Showing {filtered.length} of {records.length} records
  </span>

  <button
    type="button"
    onClick={() => alert("View all records")}
    className="inline-flex items-center gap-1 font-semibold text-[#7627b5] transition-colors hover:text-[#5b1693]"
  >
    View all records
    <ChevronRight size={14} />
  </button>
</div>
</section>;
}
   


