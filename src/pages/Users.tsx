import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/users/UserManagement";
import { Plus } from "lucide-react";

export default function Users() {
  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              User Management
            </h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <UserManagement />
      </div>
    </div>
  );
}
