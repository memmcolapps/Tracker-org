import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ReportGenerator,
  RecentReports,
} from "@/components/reports/ReportGenerator";
import { Plus, BarChart3, Smartphone, MapPin } from "lucide-react";

const reportTypes = [
  {
    id: "usage",
    title: "Usage Report",
    description: "Monthly usage summary with trends and device breakdown",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    color: "bg-primary/10",
  },
  {
    id: "performance",
    title: "Device Performance",
    description: "Device uptime, connection quality, and performance metrics",
    icon: <Smartphone className="h-6 w-6 text-green-600" />,
    color: "bg-green-100",
  },
  {
    id: "location",
    title: "Location Report",
    description: "Geographic distribution and movement analysis",
    icon: <MapPin className="h-6 w-6 text-yellow-600" />,
    color: "bg-yellow-100",
  },
];

export default function Reports() {
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Reports</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((type) => (
            <Card key={type.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.color}`}
                  >
                    {type.icon}
                  </div>
                  <Button variant="ghost" size="sm">
                    Generate
                  </Button>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Generation */}
        <div className="mb-8">
          <ReportGenerator />
        </div>

        {/* Recent Reports */}
        <RecentReports />
      </div>
    </div>
  );
}
