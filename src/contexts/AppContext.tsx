import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface App {
  theme: Theme;
  app_name: string;
  getTheme: () => Theme;
  updateTheme: (newTheme: Theme) => void;
}

export const AppContext = createContext<App>({
  theme: "light",
  app_name: "DMS",
  getTheme: () => "light",
  updateTheme: () => {
    throw Error("Must be used inside the App");
  },
});

function AppProvider({ children }: { children: ReactNode }) {
  const app_name = JSON.parse(localStorage.getItem("company_data") ?? "{}")
    .app_name as string;

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") || "system") as Theme;
    applyTheme(savedTheme);
    setTheme(savedTheme);

    if (savedTheme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);

      return () => mq.removeEventListener("change", handler);
    }
  }, []);

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
    <AppContext.Provider value={{ updateTheme, app_name, theme, getTheme }}>
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
