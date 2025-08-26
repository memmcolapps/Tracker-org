import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import {
  Smartphone,
  MapPin,
  Signal,
  Wifi,
  Clock,
  Database,
  Settings,
  Copy,
  Globe,
  Hash,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Device } from "@/types-and-interface/device.interface";
import { useState } from "react";

interface DeviceDetailsModalProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
  onViewLocation?: (device: Device) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-100 text-green-800 border-green-200";
    case "OFFLINE":
      return "bg-red-100 text-red-800 border-red-200";
    case "ERROR":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-500";
    case "OFFLINE":
      return "bg-red-500";
    case "ERROR":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

export function DeviceDetailsModal({
  device,
  isOpen,
  onClose,
  onViewLocation,
}: DeviceDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!device) return null;

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                getStatusIcon(device.status) === "bg-green-500"
                  ? "bg-green-100 text-green-600"
                  : getStatusIcon(device.status) === "bg-red-500"
                  ? "bg-red-100 text-red-600"
                  : getStatusIcon(device.status) === "bg-red-600"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{device.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusIcon(
                    device.status
                  )}`}
                ></div>
                <Badge className={cn("text-xs", getStatusColor(device.status))}>
                  {device.status}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Basic Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Hash className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Device ID</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.id}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(device.id, "deviceId")}
                >
                  <Copy
                    className={cn(
                      "h-3 w-3",
                      copiedField === "deviceId" && "text-green-600"
                    )}
                  />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Model</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.model}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Organization</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.organizationName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Type</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIM & Network Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Signal className="w-5 h-5 mr-2" />
              SIM & Network
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">SIM Number</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.simNumber}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(device.simNumber, "simNumber")}
                >
                  <Copy
                    className={cn(
                      "h-3 w-3",
                      copiedField === "simNumber" && "text-green-600"
                    )}
                  />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Signal className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">SIM Type</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.simType}
                    </p>
                  </div>
                </div>
              </div>

              {device.network ? (
                <>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">
                          Network Provider
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {device.network.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Country</p>
                        <p className="text-sm font-medium text-slate-800">
                          {device.network.country} (
                          {device.network.country_code})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">MCC</p>
                          <p className="text-sm font-medium text-slate-800">
                            {device.network.mcc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">MNC</p>
                          <p className="text-sm font-medium text-slate-800">
                            {device.network.mnc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Network</p>
                      <p className="text-sm font-medium text-slate-800">
                        Network information not available
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location & Tracking
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Coordinates</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.coordinates.latitude.toFixed(6)},{" "}
                      {device.coordinates.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleCopy(
                        `${device.coordinates.latitude}, ${device.coordinates.longitude}`,
                        "coordinates"
                      )
                    }
                  >
                    <Copy
                      className={cn(
                        "h-3 w-3",
                        copiedField === "coordinates" && "text-green-600"
                      )}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewLocation?.(device)}
                  >
                    <MapPin className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Cell ID</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.coordinates.cellId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Accuracy</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.coordinates.accuracy}m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage & Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Usage & Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Last Online</p>
                    <p className="text-sm font-medium text-slate-800">
                      {device.lastOnlineAt
                        ? formatDistanceToNow(new Date(device.lastOnlineAt), {
                            addSuffix: true,
                          })
                        : "Never"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Data Usage</p>
                    <p className="text-sm font-medium text-slate-800">
                      {Math.round(device.usage / 1024 / 1024)} MB
                    </p>
                  </div>
                </div>
              </div>

              {device.usageLimit && (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Usage Limit</p>
                      <p className="text-sm font-medium text-slate-800">
                        {device.usageLimit.used
                          ? Math.round(device.usageLimit.used / 1024 / 1024)
                          : 0}{" "}
                        /{Math.round(device.usageLimit.total / 1024 / 1024)} MB
                      </p>
                      <p className="text-xs text-slate-400">
                        Resets:{" "}
                        {new Date(
                          device.usageLimit.resets_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Created</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(device.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {device.tags && device.tags.length > 0 && (
          <div className="mt-6">
            <Separator className="mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {device.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="px-3 py-1"
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onViewLocation?.(device)}>
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
