import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AppProvider from "./contexts/AppContext";
import { ApiServiceProvider } from "./contexts/ApiServiceContext";
import { ToastProvider } from "./contexts/ToastContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <ToastProvider>
        <ApiServiceProvider>
          <RouterProvider router={router} />
        </ApiServiceProvider>
      </ToastProvider>
    </AppProvider>
  </StrictMode>
);
