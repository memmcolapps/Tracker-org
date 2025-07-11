import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertConfiguration } from "@/components/alerts/AlertConfiguration";
import { ActiveAlerts } from "@/components/alerts/ActiveAlerts";
import { Plus, AlertTriangle, CheckCircle } from "lucide-react";

export default function Alerts() {
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Alerts & Notifications
            </h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Active Alerts
                  </p>
                  <p className="text-xl font-bold text-slate-800">12</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Critical Alerts
                  </p>
                  <p className="text-xl font-bold text-slate-800">3</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Resolved Today
                  </p>
                  <p className="text-xl font-bold text-slate-800">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Configuration */}
        <div className="mb-8">
          <AlertConfiguration />
        </div>

        {/* Active Alerts */}
        <ActiveAlerts />
      </div>
    </div>
  );
}
