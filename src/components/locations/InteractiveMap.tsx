import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, Expand, MapPin, Layers } from "lucide-react";
import { Device } from "@/types-and-interface/device.interface";

declare global {
  interface Window {
    L: any;
  }
}

interface InteractiveMapProps {
  focusDevice?: {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
  devices?: Device[];
}

export function InteractiveMap({
  focusDevice,
  devices = [],
}: InteractiveMapProps) {
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
  }, [devices]); // Add devices to dependency array to re-render when devices change

  // Effect to handle focusing on a specific device
  useEffect(() => {
    // Add CSS animation for focus device marker
    if (!document.querySelector("#focus-device-styles")) {
      const style = document.createElement("style");
      style.id = "focus-device-styles";
      style.textContent = `
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .focus-device-marker {
          z-index: 1000 !important;
        }
      `;
      document.head.appendChild(style);
    }

    if (focusDevice && mapInstanceRef.current && window.L) {
      // Focus on the specific device
      mapInstanceRef.current.setView([focusDevice.lat, focusDevice.lng], 15);

      // Add a special marker for the focused device
      const focusIcon = window.L.divIcon({
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background-color: #3b82f6;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s infinite;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: "focus-device-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const focusMarker = window.L.marker([focusDevice.lat, focusDevice.lng], {
        icon: focusIcon,
      }).addTo(mapInstanceRef.current);

      const focusPopupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
            📍 ${focusDevice.name}
          </h3>
          <p style="margin: 4px 0; font-size: 14px; color: #3b82f6; font-weight: 500;">
            <strong>Focused Device</strong>
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Coordinates:</strong> ${focusDevice.lat.toFixed(
              4
            )}, ${focusDevice.lng.toFixed(4)}
          </p>
        </div>
      `;

      focusMarker.bindPopup(focusPopupContent);
      focusMarker.openPopup();

      // Store the focus marker to clean it up later
      markersRef.current.push(focusMarker);
    }
  }, [focusDevice]);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    // Determine initial center and zoom based on focusDevice or default
    const initialCenter = focusDevice
      ? [focusDevice.lat, focusDevice.lng]
      : [39.8283, -98.5795];
    const initialZoom = focusDevice ? 15 : 4;

    // Initialize map
    const map = window.L.map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
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
        ONLINE: "#10b981",
        OFFLINE: "#ef4444",
        ERROR: "#ef4444",
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
    devices.forEach((device) => {
      const marker = window.L.marker(
        [device.coordinates.latitude, device.coordinates.longitude],
        {
          icon: createIcon(device.status),
        }
      ).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
            ${device.name}
          </h3>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Model:</strong> ${device.model}
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Status:</strong> 
            <span style="
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: ${
                device.status === "ONLINE" ? "#dcfce7" : "#fee2e2"
              };
              color: ${device.status === "ONLINE" ? "#166534" : "#991b1b"};
            ">
              ${
                device.status.charAt(0).toUpperCase() +
                device.status.slice(1).toLowerCase()
              }
            </span>
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
            <strong>Last Online:</strong> ${
              device.lastOnlineAt
                ? formatDistanceToNow(new Date(device.lastOnlineAt))
                : "Never"
            }
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">
            Lat: ${device.coordinates.latitude.toFixed(
              4
            )}, Lng: ${device.coordinates.longitude.toFixed(4)}
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on("click", () => {
        setSelectedDevice(device);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers (only if no focus device is specified)
    if (devices.length > 0 && !focusDevice) {
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

  if (isLoading || devices.length === 0) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-100 rounded animate-pulse flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                {isLoading ? "Loading map..." : "Loading devices..."}
              </p>
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
              Online: {devices.filter((d) => d.status === "ONLINE").length}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Offline: {devices.filter((d) => d.status === "OFFLINE").length}
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              Error: {devices.filter((d) => d.status === "ERROR").length}
            </span>
          </div>
          <span>Total: {devices.length} devices</span>
        </div>

        {selectedDevice && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-1">
              Selected Device
            </h4>
            <p className="text-sm text-blue-800">
              {selectedDevice.name} - {selectedDevice.model}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
