import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Device } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { Smartphone, Eye, MapPin, Settings, Signal, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Device {
  id: string;
  label: string;
  location: string;
  status: string;
  lastSeen: string;
  imei: string;
  networkProvider: string;
  signalStrength: number;
}
interface DeviceCardProps {
  device: Device;
  onViewDetails?: (device: Device) => void;
  onViewLocation?: (device: Device) => void;
  onSettings?: (device: Device) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-100 text-green-800";
    case "offline":
      return "bg-red-100 text-red-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-100 text-green-600";
    case "offline":
      return "bg-red-100 text-red-600";
    case "error":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function DeviceCard({
  device,
  onViewDetails,
  onViewLocation,
  onSettings,
}: DeviceCardProps) {
  const handleCopyIMEI = () => {
    navigator.clipboard.writeText(device.imei);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                getStatusIcon(device.status)
              )}
            >
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {device.label}
              </h3>
              <p className="text-sm text-slate-500">{device.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <Badge className={cn("text-xs", getStatusColor(device.status))}>
                {device.status}
              </Badge>
              <p className="text-xs text-slate-500 mt-1">
                Last seen:{" "}
                {device.lastSeen
                  ? formatDistanceToNow(new Date(device.lastSeen), {
                      addSuffix: true,
                    })
                  : "Never"}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-slate-800">2.4 GB</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>

            <div className="text-center">
              <div className="flex items-center space-x-1">
                <Signal className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-slate-800">
                  {device.signalStrength}%
                </span>
              </div>
              <p className="text-xs text-slate-500">Signal</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails?.(device)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewLocation?.(device)}
              >
                <MapPin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettings?.(device)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-500">IMEI</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-slate-800">
                {device.imei}
              </p>
              <Button variant="ghost" size="sm" onClick={handleCopyIMEI}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500">Network</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-800">
                {device.networkProvider}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500">Location</p>
            <p className="text-sm font-medium text-slate-800">
              {device.location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
