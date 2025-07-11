import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { UsageDataTable } from "@/components/analytics/UsageDataTable";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

export default function Analytics() {
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Usage Analytics
            </h2>
            <div className="flex items-center space-x-4">
              <Select defaultValue="30d">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Usage
                  </p>
                  <p className="text-xl font-bold text-slate-800">2.4 TB</p>
                </div>
                <div className="text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1 inline" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Daily Usage
                  </p>
                  <p className="text-xl font-bold text-slate-800">82.3 GB</p>
                </div>
                <div className="text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1 inline" />
                  <span className="text-sm font-medium">-3%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Peak Usage
                  </p>
                  <p className="text-xl font-bold text-slate-800">145 GB</p>
                </div>
                <div className="text-slate-500">
                  <span className="text-sm font-medium">Dec 15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Cost Estimate
                  </p>
                  <p className="text-xl font-bold text-slate-800">$1,247</p>
                </div>
                <div className="text-yellow-600">
                  <TrendingUp className="h-4 w-4 mr-1 inline" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <AnalyticsCharts />

        {/* Usage Patterns by Time */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Usage Patterns by Time of Day
            </h3>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-slate-800">
                  Heatmap visualization
                </p>
                <p className="text-xs text-slate-500">
                  Usage patterns by hour and day
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Data Table */}
        <UsageDataTable />
      </div>
    </div>
  );
}
