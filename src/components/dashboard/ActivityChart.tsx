"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", activity: 350 }, { month: "Feb", activity: 650 },
  { month: "Mar", activity: 930 }, { month: "Apr", activity: 1240 },
  { month: "May", activity: 1480 }, { month: "Jun", activity: 1780 },
];

export function ActivityChart() {
  return <section className="rounded-2xl border border-[#e9e1ef] bg-white p-5 md:p-6">
    <div className="mb-5 flex items-start justify-between"><div><h2 className="font-medium">Activity overview</h2><p className="mt-1 text-xs text-[#9a8da5]">Platform activity over the last 6 months</p></div><select aria-label="Activity period" className="rounded-lg border border-[#e9e1ef] bg-white px-3 py-2 text-xs text-[#6f607b] outline-none"><option>Last 6 months</option><option>Last 12 months</option></select></div>
    <div className="h-[260px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}><defs><linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7627b5" stopOpacity={0.22} /><stop offset="100%" stopColor="#7627b5" stopOpacity={0.015} /></linearGradient></defs><CartesianGrid stroke="#eee8f2" vertical={false} /><XAxis dataKey="month" tick={{ fill: "#9a8da5", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} /><YAxis tick={{ fill: "#9a8da5", fontSize: 10 }} axisLine={false} tickLine={false} ticks={[0,500,1000,1500,2000]} /><Tooltip contentStyle={{ borderRadius: 10, borderColor: "#e9e1ef", fontSize: 12 }} /><Area type="monotone" dataKey="activity" stroke="#7627b5" strokeWidth={3} fill="url(#activityFill)" /></AreaChart></ResponsiveContainer></div>
  </section>;
}
