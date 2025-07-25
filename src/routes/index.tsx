import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "@/pages/NotFound";
import Loading from "@/pages/loaders/Loading";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { path: "", element: <Loading /> },
      { path: "", element: <Dashboard /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login />, index: true },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
