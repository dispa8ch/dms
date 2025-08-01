interface TabLayout {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onTabChange: (tab: Tab) => void;
  activeTab?: string;
  tabs: Tab[];
  defaultTab?: string;
  tabStyle?: React.CSSProperties;
  tabClassName?: string;
}

interface Tab {
  label: string;
  value: string;
  icon?: React.ReactNode;
  receipt?: number;
}
