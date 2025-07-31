import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "@/pages/NotFound";
import Loading from "@/pages/loaders/Loading";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import RequireAuth from "@/RequireAuth";
import Orders from "@/pages/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      // { path: "", element: <Loading /> },
      { index: true, element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
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
