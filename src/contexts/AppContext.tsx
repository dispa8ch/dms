import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useToast } from "./ToastContext";

type Theme = "light" | "dark" | "system";

interface App {
  theme: Theme;
  app_name: string;
  getTheme: () => Theme;
  updateTheme: (newTheme: Theme) => void;
  isOnline: boolean;
  companyId: string;
}

export const AppContext = createContext<App>({
  theme: "light",
  app_name: "DMS",
  getTheme: () => "light",
  updateTheme: () => {
    throw Error("Must be used inside the App");
  },
  isOnline: navigator.onLine,
  companyId: "",
});

function AppProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const app_name = JSON.parse(localStorage.getItem("company_data") ?? "{}")
    .app_name as string;

  const [theme, setTheme] = useState<Theme>("light");
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [companyId, setCompanyId] = useState<string>(
    JSON.parse(localStorage.getItem("companyData") || "{}").company_id || ""
  );

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") || "system") as Theme;
    applyTheme(savedTheme);
    setTheme(savedTheme);
    setCompanyId(
      JSON.parse(localStorage.getItem("companyData") || "{}").company_id || ""
    );

    if (savedTheme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast("You're back online!", "info");
    };

    const handleOffline = () => {
      setIsOnline(false);
      showToast("You've gone offline!", "error");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [showToast]);

  const applyTheme = (themeValue: Theme) => {
    const html = document.documentElement;

    if (themeValue === "system") {
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      html.setAttribute("data-theme", systemIsDark ? "dark" : "light");
    } else {
      html.setAttribute("data-theme", themeValue);
    }
  };

  function getTheme(): Theme {
    return (localStorage.getItem("theme") || "system") as Theme;
  }

  function updateTheme(newTheme: Theme) {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  return (
    <AppContext.Provider
      value={{ updateTheme, app_name, theme, getTheme, isOnline, companyId }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("App is not initialized");
  }
  return app;
}

export default AppProvider;
