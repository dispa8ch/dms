interface App {
  theme: Theme;
  app_name: string;
  toggleTheme: () => void;
  getTheme: () => Theme;
}

type Theme = "light" | "dark";
