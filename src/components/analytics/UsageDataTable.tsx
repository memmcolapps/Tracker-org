import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDevices } from "@/hooks/useDevices";
import { Smartphone, ArrowUp, ArrowDown } from "lucide-react";

export function UsageDataTable() {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Detailed Usage Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Usage Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>% of Total</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices?.map((device) => (
              <TableRow key={device.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">{device.label}</div>
                      <div className="text-sm text-slate-500">{device.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-slate-800">8.7 GB</div>
                  <div className="text-sm text-slate-500">This month</div>
                </TableCell>
                <TableCell className="text-sm text-slate-800">12.3%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center text-sm text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +15%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={`${device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {device.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
