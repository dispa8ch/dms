import { createContext, useEffect, useState, type ReactNode } from "react";

export const AppContext = createContext<App>({
  theme: "light",
  app_name: "DMS",
  getTheme: () => localStorage.getItem("theme") as Theme,
  toggleTheme: () => {
    throw Error("Must be used inside the App");
  },
});

function AppProvider({ children }: { children: ReactNode }) {
  const app_name = JSON.parse(localStorage.getItem("company_data") ?? "{}")
    .app_name as string;
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved as Theme);
  }, []);

  function getTheme(): Theme {
    const saved = localStorage.getItem("theme") || "light";
    return saved as Theme;
  }

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <AppContext.Provider value={{ toggleTheme, app_name, theme, getTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
