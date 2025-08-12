import { Menu, Search, Bell, User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";

interface HeaderProps {
  title?: string;
}

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/devices": "Devices",
  "/analytics": "Analytics",
  "/locations": "Locations",
  "/reports": "Reports",
  "/users": "Users",
};

export function Header({ title = "" }: HeaderProps) {
  const [location] = useLocation();
  const currentPage = pageNames[location] || "Dashboard";
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("User logged out!");
  };
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="ml-4 lg:ml-0">
          <h1 className="text-xl font-semibold text-slate-800">
            {currentPage}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
