import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentRecords } from "@/components/dashboard/RecentRecords";
import { StatCard } from "@/components/dashboard/StatCard";
import { dashboardStats } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
        <ActivityChart />
        <QuickActions />
      </section>
      <RecentRecords />
    </div>
  );
}
