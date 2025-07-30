import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect to login, preserve where user tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
