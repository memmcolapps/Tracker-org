import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Wifi, Signal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const getAlertIcon = (type: string) => {
  switch (type) {
    case "usage":
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    case "connectivity":
      return <Wifi className="h-5 w-5 text-red-600" />;
    case "signal":
      return <Signal className="h-5 w-5 text-orange-600" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-gray-600" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const isLoading = false;
const alerts = [
  {
    id: "1",
    title: "Critical Alert",
    message: "Device XYZ has been offline for more than 30 minutes",
    type: "usage",
    severity: "critical",
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "2",
    title: "High Alert",
    message: "Device XYZ has been offline for more than 30 minutes",
    type: "usage",
    severity: "high",
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "3",
    title: "Medium Alert",
    message: "Device XYZ has been offline for more than 30 minutes",
    type: "usage",
    severity: "medium",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "4",
    title: "Low Alert",
    message: "Device XYZ has been offline for more than 30 minutes",
    type: "usage",
    severity: "low",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
];

export function ActiveAlerts() {
  // const { data: alerts, isLoading } = useAlerts();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-slate-100 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-slate-200">
          {alerts
            ?.filter((alert) => alert.status === "active")
            .map((alert) => (
              <div
                key={alert.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {alert.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {alert.message} •{" "}
                      {formatDistanceToNow(new Date(alert.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Device
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
