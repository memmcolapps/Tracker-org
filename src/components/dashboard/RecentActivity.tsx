import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  MapPin,
  Clock
} from "lucide-react";
import { ActivityItem } from "@/types";

// This would come from an API in a real app
const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "online",
    device: "DEV-001",
    message: "Device DEV-001 came online",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    icon: "check-circle",
    color: "green"
  },
  {
    id: "2",
    type: "alert",
    device: "DEV-042",
    message: "High usage alert for DEV-042",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    icon: "alert-triangle",
    color: "yellow"
  },
  {
    id: "3",
    type: "offline",
    device: "DEV-078",
    message: "Device DEV-078 went offline",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    icon: "x-circle",
    color: "red"
  },
  {
    id: "4",
    type: "location",
    device: "DEV-123",
    message: "Location update for DEV-123",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: "map-pin",
    color: "blue"
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case "online":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case "offline":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "location":
      return <MapPin className="h-4 w-4 text-blue-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100";
    case "yellow":
      return "bg-yellow-100";
    case "red":
      return "bg-red-100";
    case "blue":
      return "bg-blue-100";
    default:
      return "bg-gray-100";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{activity.message}</p>
                <p className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
