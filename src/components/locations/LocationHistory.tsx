import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface LocationEvent {
  id: string;
  deviceId: string;
  deviceLabel: string;
  location: string;
  distance: string;
  timestamp: string;
  status: 'moved' | 'updated' | 'offline';
}

const mockLocationHistory: LocationEvent[] = [
  {
    id: "1",
    deviceId: "1",
    deviceLabel: "DEV-001",
    location: "New York, NY",
    distance: "2.3 miles from previous location",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "moved"
  },
  {
    id: "2",
    deviceId: "2",
    deviceLabel: "DEV-042",
    location: "Chicago, IL",
    distance: "0.8 miles from previous location",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: "updated"
  },
  {
    id: "3",
    deviceId: "3",
    deviceLabel: "DEV-078",
    location: "Los Angeles, CA",
    distance: "Device went offline",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "offline"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "moved":
      return "bg-green-500";
    case "updated":
      return "bg-yellow-500";
    case "offline":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function LocationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLocationHistory.map((event) => (
            <div key={event.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {event.deviceLabel} moved to {event.location}
                    </p>
                    <p className="text-xs text-slate-500">{event.distance}</p>
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
