import { AuthProvider } from "@/contexts/AuthContext";
import RegisterProvider from "@/contexts/RegisterContext";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <RegisterProvider>
      <div className="auth-wrapper">
        <Outlet />
      </div>
    </RegisterProvider>
  );
}
