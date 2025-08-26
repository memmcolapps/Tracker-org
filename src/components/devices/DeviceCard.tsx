import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Smartphone, Eye, MapPin, Settings, Signal, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Device } from "@/types-and-interface/device.interface";

interface DeviceCardProps {
  device: Device;
  onViewDetails?: (device: Device) => void;
  onViewLocation?: (device: Device) => void;
  onSettings?: (device: Device) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-100 text-green-800";
    case "OFFLINE":
      return "bg-red-100 text-red-800";
    case "ERROR":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
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

export function DeviceCard({
  device,
  onViewDetails,
  onViewLocation,
  onSettings,
}: DeviceCardProps) {
  const handleCopySIM = () => {
    navigator.clipboard.writeText(device.simNumber);
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
                {device.name}
              </h3>
              <p className="text-sm text-slate-500">
                {device.coordinates.latitude}, {device.coordinates.longitude}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <Badge className={cn("text-xs", getStatusColor(device.status))}>
                {device.status}
              </Badge>
              <p className="text-xs text-slate-500 mt-1">
                Last online:{" "}
                {device.lastOnlineAt
                  ? formatDistanceToNow(new Date(device.lastOnlineAt), {
                      addSuffix: true,
                    })
                  : "Never"}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-slate-800">
                {Math.round(device.usage / 1024 / 1024)} MB
              </p>
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

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-500">Sim Number</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-slate-800">
                {device.simNumber}
              </p>
              <Button variant="ghost" size="sm" onClick={handleCopySIM}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500">Network</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-800">
                {device.network?.name || device.simType}
              </span>
              {device.network?.country && (
                <span className="text-xs text-slate-500">
                  ({device.network.country})
                </span>
              )}
            </div>
            {device.network?.mcc && device.network?.mnc && (
              <p className="text-xs text-slate-400 mt-1">
                MCC: {device.network.mcc} | MNC: {device.network.mnc}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-500">Location</p>
            <p className="text-sm font-medium text-slate-800">
              {device.coordinates.latitude.toFixed(4)},{" "}
              {device.coordinates.longitude.toFixed(4)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Model</p>
            <p className="text-sm font-medium text-slate-800">{device.model}</p>
            <p className="text-xs text-slate-400 mt-1">Type: {device.type}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
