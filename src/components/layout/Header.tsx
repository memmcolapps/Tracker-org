import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "" }: HeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
