import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function LocationOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Device Locations</CardTitle>
        <Button variant="ghost" size="sm">
          View Map
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-slate-100 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-800">324 Devices Tracked</p>
              <p className="text-xs text-slate-500">Interactive map view available</p>
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
