import { Header } from "@/components/layout/Header";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { DeviceFilters } from "@/components/devices/DeviceFilters";
import { Button } from "@/components/ui/button";
import { Plus, List, Grid } from "lucide-react";
import { useState } from "react";

const devices = [
  {
    id: "1",
    name: "iPhone 14",
    status: "online",
    location: "San Francisco, CA",
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    label: "DEV-001",
    imei: "123456789012345",
    networkProvider: "Verizon",
    signalStrength: 100,
  },
  {
    id: "2",
    name: "iPhone 14",
    status: "online",
    location: "San Francisco, CA",
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    label: "DEV-002",
    imei: "123456789012345",
    networkProvider: "Verizon",
    signalStrength: 100,
  },
  {
    id: "3",
    name: "iPhone 14",
    status: "online",
    location: "New York, NY",
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    label: "DEV-001",
    imei: "123456789012345",
    networkProvider: "Verizon",
    signalStrength: 100,
  },
  {
    id: "4",
    name: "iPhone 14",
    status: "online",
    location: "San Francisco, CA",
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    label: "DEV-002",
    imei: "123456789012345",
    networkProvider: "Verizon",
    signalStrength: 100,
  },
  {
    id: "5",
    name: "iPhone 14",
    status: "online",
    location: "San Francisco, CA",
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    label: "DEV-003",
    imei: "123456789012345",
    networkProvider: "Verizon",
    signalStrength: 100,
  },
];

export default function Devices() {
  const isLoading = false;
  // const { data: devices, isLoading } = useDevices();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Device Management
            </h2>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <DeviceFilters />
        </div>

        {/* Device List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-slate-100 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {devices?.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            Showing 1 to 10 of {devices?.length || 0} devices
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
