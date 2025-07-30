interface App {
  theme: Theme;
  app_name: string;
  updateTheme: (theme: Theme) => void;
  getTheme: () => Theme;
}

type Theme = "light" | "dark" | "system";
