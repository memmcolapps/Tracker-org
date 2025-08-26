import { Header } from "@/components/layout/Header";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { DeviceFilters } from "@/components/devices/DeviceFilters";
import { Button } from "@/components/ui/button";
import { Plus, List, Grid } from "lucide-react";
import { useState } from "react";
import { useDevices } from "@/hooks/use-devices";
import { useLocation } from "wouter";
import { Device } from "@/types-and-interface/device.interface";

export default function Devices() {
  const { data: devices, isLoading } = useDevices();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [, navigate] = useLocation();

  const handleViewLocation = (device: Device) => {
    // Navigate to locations page with device coordinates as URL parameters
    const params = new URLSearchParams({
      deviceId: device.id,
      lat: device.coordinates.latitude.toString(),
      lng: device.coordinates.longitude.toString(),
      name: device.name,
    });
    navigate(`/locations?${params.toString()}`);
  };

  return (
    <div>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Device Management
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <DeviceFilters />
        </div>

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
              <DeviceCard
                key={device.id}
                device={device}
                onViewLocation={handleViewLocation}
              />
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
