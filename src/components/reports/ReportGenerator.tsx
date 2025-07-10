import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FileText, Download, Share } from "lucide-react";

export function ReportGenerator() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [devices, setDevices] = useState("");
  const [format, setFormat] = useState("");

  const handleGenerateReport = () => {
    // Implementation for report generation
    console.log("Generating report", { reportType, dateRange, devices, format });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Custom Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Usage Summary</SelectItem>
                <SelectItem value="performance">Device Performance</SelectItem>
                <SelectItem value="location">Location Analysis</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Devices</label>
            <Select value={devices} onValueChange={setDevices}>
              <SelectTrigger>
                <SelectValue placeholder="Select devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="online">Online Devices</SelectItem>
                <SelectItem value="offline">Offline Devices</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-end space-x-4">
          <Button variant="outline">
            Preview
          </Button>
          <Button onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Reports Component
export function RecentReports() {
  const recentReports = [
    {
      id: "1",
      name: "Monthly Usage Report - December 2023",
      date: "Dec 1, 2023",
      size: "2.3 MB",
      type: "pdf"
    },
    {
      id: "2",
      name: "Device Performance Report - Q4 2023",
      date: "Nov 28, 2023",
      size: "1.8 MB",
      type: "excel"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-slate-200">
          {recentReports.map((report) => (
            <div key={report.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{report.name}</p>
                  <p className="text-xs text-slate-500">Generated on {report.date} • {report.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
