import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, BarChart3, AlertTriangle, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const isLoading = false;
const stats = {
  totalDevices: 123,
  onlineDevices: 45,
  offlineDevices: 67,
  criticalAlerts: 3,
  highAlerts: 5,
  mediumAlerts: 8,
  lowAlerts: 2,
  monthlyUsage: "100 GB",
  usagePercentage: 50,
  activeAlerts: 10,
  usageAlerts: 5,
  connectionAlerts: 3,
  avgSignal: 75,
};

export function DashboardStats() {
  // const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-slate-200 rounded mb-4"></div>
              <div className="h-8 bg-slate-200 rounded mb-2"></div>
              <div className="h-6 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Devices */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Devices
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {stats?.totalDevices || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {stats?.onlineDevices || 0} Online
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {stats?.offlineDevices || 0} Offline
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data Usage */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Monthly Usage
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {stats?.monthlyUsage || "0 GB"}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Usage Progress</span>
              <span className="text-slate-800 font-medium">
                {stats?.usagePercentage || 0}%
              </span>
            </div>
            <Progress value={stats?.usagePercentage || 0} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Active Alerts
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {stats?.activeAlerts || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Usage Alerts</span>
              <span className="text-yellow-600 font-medium">
                {stats?.usageAlerts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Connection Alerts</span>
              <span className="text-red-600 font-medium">
                {stats?.connectionAlerts || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Coverage */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Signal</p>
              <p className="text-3xl font-bold text-slate-800">
                {stats?.avgSignal || 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Signal className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>+2.3% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
