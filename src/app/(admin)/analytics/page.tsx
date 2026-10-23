
"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Download,
  Search,
  Users,
  LayoutGrid,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  {
    label: "Candidates",
    value: "2,450",
    growth: "+12.5%",
    icon: Users,
    color: "bg-[#f0e7f7] text-[#7627b5]",
  },
  {
    label: "Employers",
    value: "186",
    growth: "+8.2%",
    icon: BriefcaseBusiness,
    color: "bg-[#e4f3fb] text-[#2476a5]",
  },
  {
    label: "Jobs",
    value: "324",
    growth: "+5.4%",
    icon: CalendarDays,
    color: "bg-[#fff0dc] text-[#b76a08]",
  },
  {
    label: "Applications",
    value: "1,820",
    growth: "+18.6%",
    icon: LayoutGrid,
    color: "bg-[#e2f5ed] text-[#14805e]",
  },
];

const activityData = [
  { month: "Jan", activity: 350 },
  { month: "Feb", activity: 650 },
  { month: "Mar", activity: 920 },
  { month: "Apr", activity: 1200 },
  { month: "May", activity: 1480 },
  { month: "Jun", activity: 1760 },
];

const actions = [
  {
    title: "Review approvals",
    description: "12 employers pending",
    icon: Users,
  },
  {
    title: "Manage job fairs",
    description: "3 upcoming events",
    icon: CalendarDays,
  },
  {
    title: "View applications",
    description: "24 require review",
    icon: BriefcaseBusiness,
  },
  {
    title: "Export report",
    description: "Download as CSV",
    icon: Download,
  },
];

const records = [
  {
    name: "Platform review",
    details: "Operations and quality",
    status: "Active",
    updated: "Today, 09:40",
  },
  {
    name: "Monthly performance",
    details: "Reporting period · June",
    status: "Complete",
    updated: "Yesterday",
  },
  {
    name: "Policy update",
    details: "Admin workflow",
    status: "Pending",
    updated: "Jun 16, 2025",
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-[#e5f5ef] text-[#14805e]",
  Complete: "bg-[#f0e7f7] text-[#7627b5]",
  Pending: "bg-[#fff0dc] text-[#b76a08]",
};

export default function AnalyticsPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("6");

  const filteredRecords = useMemo(
    () =>
      records.filter((record) =>
        `${record.name} ${record.details} ${record.status}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7627b5]">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#24152f]">
            Analytics &amp; Reports
          </h1>
          <p className="mt-2 text-sm text-[#81768b]">
            Monitor growth and export reports across Aaro Jobs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Report export will be connected next.")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7627b5] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5b168f]"
        >
          Export report
          <ArrowDownToLine size={16} />
        </button>
      </div>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e9e1ef] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-[#81768b]">{stat.label}</p>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#24152f]">
                {stat.value}
              </h2>

              <p className="mt-2 text-[10px] text-[#81768b]">
                <span className="font-semibold text-[#14805e]">
                  ↗ {stat.growth}
                </span>{" "}
                vs last month
              </p>
            </div>
          );
        })}
      </section>

      {/* Activity chart and quick actions */}
<section className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">  <div className="min-w-0 rounded-2xl border border-[#e9e1ef] bg-white p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium text-[#24152f]">
                Activity overview
              </h2>
              <p className="mt-1 text-xs text-[#9a8da5]">
                Platform activity over the last {period} months
              </p>
            </div>

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg border border-[#e9e1ef] bg-white px-3 py-2 text-xs text-[#81768b] outline-none focus:border-[#7627b5]"
            >
              <option value="6">Last 6 months</option>
              <option value="3">Last 3 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={
                  period === "3"
                    ? activityData.slice(-3)
                    : activityData
                }
                margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="analyticsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#7627b5"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="#7627b5"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#eee8f2"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9a8da5", fontSize: 10 }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9a8da5", fontSize: 10 }}
                  width={34}
                  domain={[0, 2000]}
                  ticks={[0, 500, 1000, 1500, 2000]}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e9e1ef",
                    fontSize: 12,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="activity"
                  stroke="#7627b5"
                  strokeWidth={3}
                  fill="url(#analyticsGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#7627b5" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e9e1ef] bg-white p-5">
          <h2 className="text-sm font-medium text-[#24152f]">
            Quick actions
          </h2>
          <p className="mt-1 text-xs text-[#9a8da5]">
            Common admin tasks
          </p>

          <div className="mt-3">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() =>
                    alert(`${action.title} will be connected next.`)
                  }
                  className="flex w-full items-center gap-3 border-b border-[#eee8f2] py-3 text-left last:border-b-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5ecfb] text-[#7627b5]">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-[#24152f]">
                      {action.title}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#9a8da5]">
                      {action.description}
                    </span>
                  </span>

                  <ChevronRight
                    size={16}
                    className="shrink-0 text-[#9a8da5]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent analytics and reports */}
      <section className="overflow-hidden rounded-2xl border border-[#e9e1ef] bg-white">
        <div className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:px-6">
          <div>
            <h2 className="text-sm font-medium text-[#24152f]">
              Recent analytics &amp; reports
            </h2>
            <p className="mt-1 text-xs text-[#9a8da5]">
              Latest records and changes
            </p>
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-[#e9e1ef] px-3 py-2">
            <Search size={15} className="text-[#9a8da5]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records"
              className="w-full text-xs outline-none placeholder:text-[#a99db3] md:w-36"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs">
            <thead className="bg-[#faf8fc] text-[10px] uppercase tracking-wide text-[#81768b]">
              <tr>
                <th className="px-5 py-3 md:px-6">Name / item</th>
                <th className="px-5 py-3">Details</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.name}
                  className="border-t border-[#eee8f2]"
                >
                  <td className="px-5 py-4 font-semibold text-[#24152f] md:px-6">
                    {record.name}
                  </td>
                  <td className="px-5 py-4 text-[#81768b]">
                    {record.details}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[record.status]}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#81768b]">
                    {record.updated}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => alert(`Selected: ${record.name}`)}
                      className="inline-flex items-center gap-1 font-semibold text-[#7627b5]"
                    >
                      View <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-xs text-[#9a8da5]"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#eee8f2] px-5 py-3 text-xs md:px-6">
          <span className="text-[#9a8da5]">
            Showing {filteredRecords.length} of {records.length} records
          </span>

          <button
            type="button"
            onClick={() => alert("All reports will be connected next.")}
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#7627b5] hover:text-[#5b168f]"
          >
            View all records <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}

