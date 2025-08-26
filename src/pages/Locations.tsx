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
import { Plus, Smartphone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const mockDeviceList = [
  {
    id: "1",
    label: "Abuja",
    location: "Abuja, FCT",
    status: "online",
    coordinates: [9.0765, 7.3986],
    lastSeen: new Date(Date.now()).toISOString(), // Placeholder for current time
  },
  {
    id: "2",
    label: "Lagos",
    location: "Lagos, Lagos State",
    status: "online",
    coordinates: [6.5244, 3.3792],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "3",
    label: "Kano",
    location: "Kano, Kano State",
    status: "online",
    coordinates: [12.0, 8.5167],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "4",
    label: "Ibadan",
    location: "Ibadan, Oyo State",
    status: "online",
    coordinates: [7.3964, 3.9178],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "5",
    label: "Port Harcourt",
    location: "Port Harcourt, Rivers State",
    status: "offline",
    coordinates: [4.7717, 7.0042],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "6",
    label: "Benin City",
    location: "Benin City, Edo State",
    status: "online",
    coordinates: [6.3333, 5.6167],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "7",
    label: "Enugu",
    location: "Enugu, Enugu State",
    status: "online",
    coordinates: [6.4357, 7.4953],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "8",
    label: "Kaduna",
    location: "Kaduna, Kaduna State",
    status: "offline",
    coordinates: [10.5167, 7.4333],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "9",
    label: "Jos",
    location: "Jos, Plateau State",
    status: "online",
    coordinates: [9.9231, 8.8906],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "10",
    label: "Zuma Rock",
    location: "Near Abuja, Niger State",
    status: "online",
    coordinates: [9.7397, 7.2478],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "11",
    label: "Erin-Ijesha Waterfalls",
    location: "Erin-Ijesha, Osun State",
    status: "online",
    coordinates: [7.4906, 4.8119],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "12",
    label: "Mount Chappal Waddi",
    location: "Taraba State",
    status: "online",
    coordinates: [7.067, 11.083],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "13",
    label: "Ogbunike Caves",
    location: "Ogbunike, Anambra State",
    status: "online",
    coordinates: [6.1822, 6.9389],
    lastSeen: new Date(Date.now()).toISOString(),
  },
  {
    id: "14",
    label: "Niger River Delta (Central)",
    location: "Niger Delta Region",
    status: "online",
    coordinates: [5.0, 6.0],
    lastSeen: new Date(Date.now()).toISOString(),
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
  const [focusDevice, setFocusDevice] = useState<
    | {
        id: string;
        name: string;
        lat: number;
        lng: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    // Parse URL parameters to check if a specific device should be focused
    const urlParams = new URLSearchParams(window.location.search);
    const deviceId = urlParams.get("deviceId");
    const lat = urlParams.get("lat");
    const lng = urlParams.get("lng");
    const name = urlParams.get("name");

    if (deviceId && lat && lng && name) {
      setFocusDevice({
        id: deviceId,
        name: name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  }, []);
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Device Locations
              </h2>
              {focusDevice && (
                <p className="text-sm text-blue-600 mt-1">
                  📍 Focused on: {focusDevice.name} (
                  {focusDevice.lat.toFixed(4)}, {focusDevice.lng.toFixed(4)})
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {focusDevice && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFocusDevice(undefined);
                    // Update URL to remove parameters
                    window.history.replaceState(
                      {},
                      document.title,
                      window.location.pathname
                    );
                  }}
                >
                  Clear Focus
                </Button>
              )}
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
            <InteractiveMap focusDevice={focusDevice} />
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
      </div>
    </div>
  );
}
