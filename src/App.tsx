import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Devices from "@/pages/Devices";
import Analytics from "@/pages/Analytics";
import Locations from "@/pages/Locations";
import Reports from "@/pages/Reports";
import Users from "@/pages/Users";
import NotFound from "@/pages/not-found";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route>
        <ProtectedRoute>
          <AppLayout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/devices" component={Devices} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/locations" component={Locations} />
              <Route path="/reports" component={Reports} />
              <Route path="/users" component={Users} />
              <Route component={NotFound} />
            </Switch>
          </AppLayout>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
