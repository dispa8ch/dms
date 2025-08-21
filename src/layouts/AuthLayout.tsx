import { ApiServiceProvider } from "@/contexts/ApiServiceContext";
import { AuthProvider } from "@/contexts/AuthContext";
import RegisterProvider from "@/contexts/RegisterContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <ToastProvider>
      <ApiServiceProvider>
        <RegisterProvider>
          <div className="auth-wrapper">
            <Outlet />
          </div>
        </RegisterProvider>
      </ApiServiceProvider>
    </ToastProvider>
  );
}
