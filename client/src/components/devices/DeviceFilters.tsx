import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeviceFiltersProps {
  onStatusChange?: (status: string) => void;
  onLocationChange?: (location: string) => void;
  onUsageChange?: (usage: string) => void;
  onNetworkChange?: (network: string) => void;
}

export function DeviceFilters({ 
  onStatusChange, 
  onLocationChange, 
  onUsageChange, 
  onNetworkChange 
}: DeviceFiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <Select onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <Select onValueChange={onLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Usage</label>
            <Select onValueChange={onUsageChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Usage</SelectItem>
                <SelectItem value="high">High Usage</SelectItem>
                <SelectItem value="near-limit">Near Limit</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Network</label>
            <Select onValueChange={onNetworkChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Networks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Networks</SelectItem>
                <SelectItem value="verizon">Verizon</SelectItem>
                <SelectItem value="att">AT&T</SelectItem>
                <SelectItem value="tmobile">T-Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
