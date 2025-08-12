import { useAuth } from "@/context/AuthContext";
import { Redirect } from "wouter";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
