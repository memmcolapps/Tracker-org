import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveMap } from "@/components/locations/InteractiveMap";
import { LocationHistory } from "@/components/locations/LocationHistory";
import { Badge } from "@/components/ui/badge";
import { Plus, Smartphone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const mockDeviceList = [
  {
    id: "1",
    label: "DEV-001",
    location: "New York, NY",
    status: "online",
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    label: "DEV-042",
    location: "Chicago, IL",
    status: "warning",
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    label: "DEV-078",
    location: "Los Angeles, CA",
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-100 text-green-600";
    case "warning":
      return "bg-yellow-100 text-yellow-600";
    case "offline":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Locations() {
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Device Locations
            </h2>
            <div className="flex items-center space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="offline">Offline Only</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Geofence
              </Button>
            </div>
          </div>
        </div>

        {/* Map and Device List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <InteractiveMap />
          </div>

          {/* Device List */}
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
                {mockDeviceList.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
                          device.status
                        )}`}
                      >
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {device.label}
                        </p>
                        <p className="text-xs text-slate-500">
                          {device.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatDistanceToNow(new Date(device.lastSeen), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location History */}
        <LocationHistory />
      </div>
    </div>
  );
}
