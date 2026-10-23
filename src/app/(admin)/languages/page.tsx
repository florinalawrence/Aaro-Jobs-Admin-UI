"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Download,
  LayoutGrid,
  Plus,
  Search,
  Users,
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

type Languages = {
  name: string;
  details: string;
  status: "Active" | "Pending" | "Suspended";
  updated: string;
};

const stats = [
  {
    label: "Languages",
    value: "4",
    icon: Users,
    color: "bg-[#f0e7f7] text-[#7627b5]",
  },
  {
    label: "Translated Strings",
    value: "1,240",
    icon: BriefcaseBusiness,
    color: "bg-[#e4f3fb] text-[#2476a5]",
  },
  {
    label: "Needs Review",
    value: "32",
    icon: CalendarDays,
    color: "bg-[#fff0dc] text-[#b76a08]",
  },
  {
    label: "Default",
    value: "English",
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
  { month: "Jul", activity: 1650 },
  { month: "Aug", activity: 1900 },
  { month: "Sep", activity: 2050 },
  { month: "Oct", activity: 2180 },
  { month: "Nov", activity: 2320 },
  { month: "Dec", activity: 2450 },
];

const quickActions = [
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

const initialLanguages: Languages[] = [
  {
    name: "English",
    details: "1,240 of 1,240 strings",
    status: "Active",
    updated: "Today, 10:24",
  },
  {
    name: "Arabic",
    details: "1,220 of 1,240 strings",
    status: "Active",
    updated: "Yesterday",
  },
  {
    name: "French",
    details: "1,208 of 1,240 strings",
    status: "Pending",
    updated: "Jun 18, 2025",
  },
];

const statusStyles: Record<Languages["status"], string> = {
  Active: "bg-[#e5f5ef] text-[#14805e]",
  Pending: "bg-[#fff0dc] text-[#b76a08]",
  Suspended: "bg-[#fde8e8] text-[#c24141]",
};

export default function LanguagesPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("6");
  const [languages, setLanguages] =
    useState<Languages[]>(initialLanguages);

  const filteredLanguages = useMemo(
    () =>
      languages.filter((language) =>
        `${language.name} ${language.details} ${language.status}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [languages, search]
  );

  const chartData = useMemo(
    () => activityData.slice(-Number(period)),
    [period]
  );

  function exportLanguages() {
    const headers = ["Name", "Details", "Status", "Updated"];

    const rows = filteredLanguages.map((language) => [
      language.name,
      language.details,
      language.status,
      language.updated,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "aarojobs-languages.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function addLanguage() {
    const name = window.prompt("Enter language name:");
    if (!name?.trim()) return;

    const jobTitle = window.prompt("Enter job title:");
    if (!jobTitle?.trim()) return;

    setLanguages((previous) => [
      {
        name: name.trim(),
        details: jobTitle.trim(),
        status: "Pending",
        updated: "Just now",
      },
      ...previous,
    ]);
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7627b5]">
            Communication
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#24152f]">
            Languages
          </h1>

          <p className="mt-2 text-sm text-[#81768b]">
            Review translations and manage supported platform languages.
          </p>
        </div>

        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#7627b5] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5b168f]"
        >
          Add language
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Statistics cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e9e1ef] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-[#81768b]">
                  {stat.label}
                </p>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#24152f]">
                {stat.value}
              </h2>

              <p className="mt-2 text-[10px] text-[#81768b]">
                {stat.label === "Languages" && (
                  <>
                    <span className="font-semibold text-[#14805e]">
                      ↗ +12.5%
                    </span>{" "}
                    vs last month
                  </>
                )}

                {stat.label === "Translated Strings" && (
                  <>
                    <span className="font-semibold text-[#14805e]">
                      ↗ +9.4%
                    </span>{" "}
                    vs last month
                  </>
                )}

                {stat.label === "Needs Review" &&
                  "Current total vs last month"}

                {stat.label === "Default" &&
                  "Current total vs last month"}
              </p>
            </div>
          );
        })}
      </section>

      {/* Activity chart and quick actions */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
        {/* Activity overview */}
        <div className="min-w-0 rounded-2xl border border-[#e9e1ef] bg-white p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium text-[#24152f]">
                Activity overview
              </h2>

              <p className="mt-1 text-xs text-[#9a8da5]">
                Platform activity over the last {period} months
              </p>
            </div>

            <div className="relative">
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="appearance-none rounded-lg border border-[#e9e1ef] bg-white py-2 pl-3 pr-8 text-xs text-[#81768b] outline-none focus:border-[#7627b5]"
              >
                <option value="6">Last 6 months</option>
                <option value="3">Last 3 months</option>
                <option value="12">Last 12 months</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#81768b]"
              />
            </div>
          </div>

          <div className="h-[280px] w-full sm:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 8,
                  right: 4,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="candidateActivityGradient"
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
                  tick={{
                    fill: "#9a8da5",
                    fontSize: 10,
                  }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9a8da5",
                    fontSize: 10,
                  }}
                  width={34}
                  domain={[0, 2500]}
                  ticks={[0, 500, 1000, 1500, 2000, 2500]}
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
                  name="Platform activity"
                  stroke="#7627b5"
                  strokeWidth={3}
                  fill="url(#candidateActivityGradient)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#7627b5",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-[#e9e1ef] bg-white p-5">
          <h2 className="text-sm font-medium text-[#24152f]">
            Quick actions
          </h2>

          <p className="mt-1 text-xs text-[#9a8da5]">
            Common admin tasks
          </p>

          <div className="mt-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => {
                    if (action.title === "Export report") {
                      exportLanguages();
                    } else {
                      window.alert(
                        `${action.title} will be connected to its respective page.`
                      );
                    }
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#eee8f2] py-3 text-left transition last:border-b-0 hover:bg-[#fcfaff]"
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

      {/* Recent language table */}
      <section className="overflow-hidden rounded-2xl border border-[#e9e1ef] bg-white">
        <div className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:px-6">
          <div>
            <h2 className="text-sm font-medium text-[#24152f]">
              Recent languages
            </h2>

            <p className="mt-1 text-xs text-[#9a8da5]">
              Latest records and changes
            </p>
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-[#e9e1ef] px-3 py-2 focus-within:border-[#7627b5]">
            <Search
              size={15}
              className="shrink-0 text-[#9a8da5]"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records"
              aria-label="Search records"
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#a99db3] md:w-36"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs">
            <thead className="bg-[#faf8fc] text-[10px] uppercase tracking-wide text-[#81768b]">
              <tr>
                <th className="px-5 py-3 md:px-6">
                  Name / Item
                </th>
                <th className="px-5 py-3">Details</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredLanguages.map((language) => (
                <tr
                  key={`${language.name}-${language.updated}`}
                  className="border-t border-[#eee8f2] transition hover:bg-[#fcfaff]"
                >
                  <td className="px-5 py-4 font-semibold text-[#24152f] md:px-6">
                    {language.name}
                  </td>

                  <td className="px-5 py-4 text-[#81768b]">
                    {language.details}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[language.status]}`}
                    >
                      {language.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#81768b]">
                    {language.updated}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Language: ${language.name}\nDetails: ${language.details}\nStatus: ${language.status}`
                        )
                      }
                      className="inline-flex items-center gap-1 font-semibold text-[#7627b5] hover:text-[#5b168f]"
                    >
                      View
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLanguages.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-xs text-[#9a8da5]"
                  >
                    No matching languages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#eee8f2] px-5 py-3 text-xs sm:flex-row sm:items-center md:px-6">
          <span className="text-[#9a8da5]">
            Showing {filteredLanguages.length} of {languages.length} records
          </span>

          <button
            type="button"
            onClick={exportLanguages}
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#7627b5] hover:text-[#5b168f]"
          >
            View all records
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}