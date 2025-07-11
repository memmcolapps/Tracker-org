import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Devices from "@/pages/Devices";
import Analytics from "@/pages/Analytics";
import Locations from "@/pages/Locations";
import Reports from "@/pages/Reports";
import Alerts from "@/pages/Alerts";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/devices" component={Devices} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/locations" component={Locations} />
        <Route path="/reports" component={Reports} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/users" component={Users} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
