import { createContext, useContext } from "react";
import { useApiService } from "./ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";

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

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
