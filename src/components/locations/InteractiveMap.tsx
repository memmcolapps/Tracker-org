import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, Expand, MapPin } from "lucide-react";
// import { useLocationAnalytics } from "@/hooks/useAnalytics";

const isLoading = false;
const locationData = [
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
export function InteractiveMap() {
  // const { data: locationData, isLoading } = useLocationAnalytics();

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-100 rounded animate-pulse"></div>
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
            <Button variant="ghost" size="sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-slate-100 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-800">
                Interactive Map
              </p>
              <p className="text-xs text-slate-500">
                Device locations would be displayed here
              </p>
            </div>
          </div>
          {/* Mock device markers */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
}
