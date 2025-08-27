import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/users/UserManagement";
import { Plus } from "lucide-react";

export default function Users() {
  return (
    <div>
      <div className="p-6">
        <UserManagement />
      </div>
    </div>
  );
}
