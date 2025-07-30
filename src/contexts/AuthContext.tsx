import { createContext, useContext, useEffect } from "react";
import { useApiService } from "./ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// External logout logic
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const api = useApiService();
  const logout = () => {
    api
      .post(apiRoutes.user.logout, {})
      .then(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("companyData");
          localStorage.removeItem("userData");
        }
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Optionally show a toast or alert here
      })
      .finally(() => {
        // Any additional cleanup can be done here
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login
      navigate("/auth/login");
    } else {
      alert(token);
    }
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
