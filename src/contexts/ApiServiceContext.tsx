import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import SessionExpiredModal from "@/lib/modal/SessionExpiredModal";

const ApiServiceContext = createContext<ApiServiceType | null>(null);

export const useApiService = () => {
  const ctx = useContext(ApiServiceContext);
  if (!ctx) throw new Error("ApiServiceContext must be used within a provider");
  return ctx;
};

export const ApiServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [showSessionModal, setShowSessionModal] = useState(false);

  const getAuthHeader = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleResponse = async <T,>(
    res: Response
  ): Promise<BaseResponse<T>> => {
    const json = await res.json();

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        showToast(json.message || "Session expired.", "error");
        setShowSessionModal(true);
        setTimeout(() => logout(), 10000);
      } else {
        showToast(json.message || "An error occurred.", "error");
      }
      throw new Error(json.message || "API error");
    }

    return json;
  };

  const api = {
    get: <T,>(url: string) =>
      fetch(url, {
        headers: {
          ...getAuthHeader(),
        },
      } as RequestInit).then((res) => handleResponse<T>(res)),

    post: <T,>(url: string, data?: any) =>
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      } as RequestInit).then((res) => handleResponse<T>(res)),

    put: <T,>(url: string, data?: any) =>
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      } as RequestInit).then((res) => handleResponse<T>(res)),

    del: <T,>(url: string) =>
      fetch(url, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      } as RequestInit).then((res) => handleResponse<T>(res)),
  };

  return (
    <ApiServiceContext.Provider value={api}>
      {children}
      {showSessionModal && <SessionExpiredModal />}
    </ApiServiceContext.Provider>
  );
};
