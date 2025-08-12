import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Smartphone,
  BarChart3,
  MapPin,
  FileText,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Devices", href: "/devices", icon: Smartphone },
  { name: "Usage Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Locations", href: "/locations", icon: MapPin },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
];

const DEFAULT_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Nigeria_Police_logo.jpg/250px-Nigeria_Police_logo.jpg";

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const logoUrl = user?.organization?.logoUrl || DEFAULT_LOGO_URL;

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-slate-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              src={logoUrl}
              alt="Organization Logo"
              className="w-8 h-8 rounded-lg object-cover"
              onError={(e) => {
                // Fallback to default logo if the provided one fails to load
                (e.target as HTMLImageElement).src = DEFAULT_LOGO_URL;
              }}
            />
            <span className="ml-3 text-xl font-semibold text-slate-800">
              {user?.organization?.name || "Organization"}
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive =
                location === item.href ||
                (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
