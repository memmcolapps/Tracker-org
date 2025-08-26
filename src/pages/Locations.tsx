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
import { useDevices } from "@/hooks/use-devices";
import { Device } from "@/types-and-interface/device.interface";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-100 text-green-600";
    case "OFFLINE":
      return "bg-red-100 text-red-600";
    case "ERROR":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Locations() {
  const { data: devices, isLoading } = useDevices();
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
              {/* <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Geofence
              </Button> */}
            </div>
          </div>
        </div>

        {/* Map and Device List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <InteractiveMap focusDevice={focusDevice} devices={devices || []} />
          </div>

          {/* Device List */}
          <Card>
            <CardHeader>
              <CardTitle>Devices ({devices?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-slate-100 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : devices && devices.length > 0 ? (
                <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
                  {devices.map((device: Device) => (
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
                            {device.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {device.coordinates.latitude.toFixed(4)},{" "}
                            {device.coordinates.longitude.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {device.lastOnlineAt
                          ? formatDistanceToNow(new Date(device.lastOnlineAt), {
                              addSuffix: true,
                            })
                          : "Never"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 text-slate-500">
                  <div className="text-center">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm">No devices found</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
