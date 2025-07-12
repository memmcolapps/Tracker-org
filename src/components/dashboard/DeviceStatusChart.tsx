import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
// import { useDeviceAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";

// const COLORS = {
//   online: "hsl(var(--success))",
//   offline: "hsl(var(--destructive))",
//   error: "hsl(var(--warning))",
// };

const isLoading = false;

const deviceData = [
  { status: "online", count: 75, name: "Online" },
  { status: "offline", count: 15, name: "Offline" },
  { status: "deactivated", count: 10, name: "Deactivated" },
];

// Define colors for the chart slices
const COLORS = {
  online: "#82ca9d", // Greenish
  offline: "#ffc658", // Yellowish/Orange
  deactivated: "#ff7300", // More orange/red
};
export function DeviceStatusChart() {
  // const { data: deviceData, isLoading } = useDeviceAnalytics();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Device Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Device Status</CardTitle>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="count"
            >
              {deviceData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status as keyof typeof COLORS]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
