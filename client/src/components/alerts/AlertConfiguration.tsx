import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AlertConfiguration() {
  const [usageAlerts, setUsageAlerts] = useState(true);
  const [offlineAlerts, setOfflineAlerts] = useState(true);
  const [locationAlerts, setLocationAlerts] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="usage-alerts" className="text-sm font-medium">Data Usage Alerts</Label>
              <p className="text-xs text-slate-500">Notify when device usage exceeds thresholds</p>
            </div>
            <Switch
              id="usage-alerts"
              checked={usageAlerts}
              onCheckedChange={setUsageAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline-alerts" className="text-sm font-medium">Device Offline Alerts</Label>
              <p className="text-xs text-slate-500">Notify when devices go offline</p>
            </div>
            <Switch
              id="offline-alerts"
              checked={offlineAlerts}
              onCheckedChange={setOfflineAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="location-alerts" className="text-sm font-medium">Location Alerts</Label>
              <p className="text-xs text-slate-500">Geofence boundary notifications</p>
            </div>
            <Switch
              id="location-alerts"
              checked={locationAlerts}
              onCheckedChange={setLocationAlerts}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
              <p className="text-xs text-slate-500">Send alerts via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications" className="text-sm font-medium">SMS Notifications</Label>
              <p className="text-xs text-slate-500">Send critical alerts via SMS</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="text-sm font-medium">Push Notifications</Label>
              <p className="text-xs text-slate-500">Browser push notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
