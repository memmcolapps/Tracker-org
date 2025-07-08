import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { DeviceStatusChart } from "@/components/dashboard/DeviceStatusChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LocationOverview } from "@/components/dashboard/LocationOverview";
import { Header } from "@/components/layout/Header";

export default function Dashboard() {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-6">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UsageChart />
          <DeviceStatusChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <LocationOverview />
        </div>
      </div>
    </div>
  );
}
