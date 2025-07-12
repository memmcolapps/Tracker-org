import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, Expand, MapPin, Layers } from "lucide-react";

declare global {
  interface Window {
    L: any;
  }
}

// Mock device data with real coordinates
const deviceData = [
  {
    id: "1",
    label: "DEV-001",
    location: "New York, NY",
    status: "online",
    coordinates: [9.0765, 7.3986],
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    label: "DEV-042",
    location: "Chicago, IL",
    status: "warning",
    coordinates: [6.5244, 3.3792],
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    label: "DEV-078",
    location: "Los Angeles, CA",
    status: "offline",
    coordinates: [34.0522, -118.2437],
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    label: "DEV-099",
    location: "Miami, FL",
    status: "online",
    coordinates: [25.7617, -80.1918],
    lastSeen: new Date(Date.now() - 30 * 1000).toISOString(),
  },
  {
    id: "5",
    label: "DEV-123",
    location: "Seattle, WA",
    status: "warning",
    coordinates: [47.6062, -122.3321],
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
];
interface Device {
  id: string;
  label: string;
  location: string;
  status: string;
  coordinates: number[];
  lastSeen: string;
}
export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device>();
  const [mapStyle, setMapStyle] = useState("street");
  const [isLoading, setIsLoading] = useState(false);

  // Load Leaflet CSS and JS
  useEffect(() => {
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
        script.onload = () => {
          initializeMap();
        };
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    // Initialize map centered on US
    const map = window.L.map(mapRef.current, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });

    // Add tile layer
    const getTileLayer = (style: string) => {
      const layers: Record<string, string> = {
        street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        satellite:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      };

      return window.L.tileLayer(layers[style] || layers.street, {
        attribution:
          style === "satellite"
            ? "© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
            : "© OpenStreetMap contributors",
        maxZoom: 18,
      });
    };

    getTileLayer(mapStyle).addTo(map);

    // Add custom zoom control
    window.L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);

    // Create custom icons for different statuses
    const createIcon = (status: string) => {
      const colors: Record<string, string> = {
        online: "#10b981",
        warning: "#f59e0b",
        offline: "#ef4444",
      };

      return window.L.divIcon({
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background-color: ${colors[status] || "#6b7280"};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: "custom-marker",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    };

    // Add markers for each device
    deviceData.forEach((device) => {
      const marker = window.L.marker(device.coordinates, {
        icon: createIcon(device.status),
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
            ${device.label}
          </h3>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Location:</strong> ${device.location}
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Status:</strong> 
            <span style="
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: ${
                device.status === "online"
                  ? "#dcfce7"
                  : device.status === "warning"
                  ? "#fef3c7"
                  : "#fee2e2"
              };
              color: ${
                device.status === "online"
                  ? "#166534"
                  : device.status === "warning"
                  ? "#92400e"
                  : "#991b1b"
              };
            ">
              ${device.status.charAt(0).toUpperCase() + device.status.slice(1)}
            </span>
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Last Seen:</strong> ${formatDistanceToNow(
              new Date(device.lastSeen)
            )}
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">
            Lat: ${device.coordinates[0].toFixed(
              4
            )}, Lng: ${device.coordinates[1].toFixed(4)}
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on("click", () => {
        setSelectedDevice(device);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (deviceData.length > 0) {
      const group = new window.L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    mapInstanceRef.current = map;
    setIsLoading(false);
  };

  const formatDistanceToNow = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleFullscreen = () => {
    if (mapRef.current) {
      if (mapRef.current.requestFullscreen) {
        mapRef.current.requestFullscreen();
      }
    }
  };

  const changeMapStyle = () => {
    const styles = ["street", "satellite", "terrain"];
    const currentIndex = styles.indexOf(mapStyle);
    const nextStyle = styles[(currentIndex + 1) % styles.length];
    setMapStyle(nextStyle);

    if (mapInstanceRef.current && window.L) {
      const L = window.L;

      // Remove current tile layer
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add new tile layer
      const getTileLayer = (style: string) => {
        const layers: Record<string, string> = {
          street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          satellite:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        };

        return window.L.tileLayer(layers[style] || layers.street, {
          attribution:
            style === "satellite"
              ? "© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
              : "© OpenStreetMap contributors",
          maxZoom: 18,
        });
      };

      getTileLayer(nextStyle).addTo(mapInstanceRef.current);
    }
  };

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-100 rounded animate-pulse flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Loading map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Interactive Map</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={changeMapStyle}
              title={`Switch to ${
                mapStyle === "street"
                  ? "satellite"
                  : mapStyle === "satellite"
                  ? "terrain"
                  : "street"
              } view`}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFullscreen}>
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="h-80 rounded-lg border"
          style={{ zIndex: 1 }}
        />

        {/* Device count and status summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Online: {deviceData.filter((d) => d.status === "online").length}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Warning: {deviceData.filter((d) => d.status === "warning").length}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Offline: {deviceData.filter((d) => d.status === "offline").length}
            </span>
          </div>
          <span>Total: {deviceData.length} devices</span>
        </div>

        {selectedDevice && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-1">
              Selected Device
            </h4>
            <p className="text-sm text-blue-800">
              {selectedDevice.label} - {selectedDevice.location}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
