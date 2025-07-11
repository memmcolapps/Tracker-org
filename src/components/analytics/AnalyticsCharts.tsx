import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export function AnalyticsCharts() {
  const isLoading = false;
  const usageData = [
    {
      date: "2022-01-01",
      usage: 100,
    },
    {
      date: "2022-01-02",
      usage: 200,
    },
    {
      date: "2022-01-03",
      usage: 300,
    },
    {
      date: "2022-01-04",
      usage: 400,
    },
    {
      date: "2022-01-05",
      usage: 500,
    },
  ];
  const deviceData = [
    {
      device: "DEV-001",
      usage: 100,
    },
    {
      device: "DEV-002",
      usage: 200,
    },
    {
      device: "DEV-003",
      usage: 300,
    },
    {
      device: "DEV-004",
      usage: 400,
    },
    {
      device: "DEV-005",
      usage: 500,
    },
  ];
  const usageLoading = false;
  const deviceLoading = false;
  // const { data: usageData, isLoading: usageLoading } = useUsageAnalytics();
  // const { data: deviceData, isLoading: deviceLoading } = useDeviceAnalytics();

  if (usageLoading || deviceLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Devices by Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Usage Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Device Usage Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Devices by Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="device" />
              <Tooltip />
              <Bar dataKey="usage" fill="hsl(var(--success))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
