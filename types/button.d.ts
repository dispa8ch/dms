type Dispa8chButtonColor = "purple-main" | "black" | "grey" | "blue";
type Dispa8chButtonType = "primary" | "secondary" | "outline" | "link" | "text";

interface Dispa8chButton {
  label: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  color?: Dispa8chButtonColor;
  type: Dispa8chButtonType;
  disabled?: boolean;
  path?: string;
  loading?: boolean;
  link_type?: "text" | "outline";
  size?: "small" | "medium" | "large";
  buttonStyle?: React.CSSProperties;
}

interface Dispa8chToggleButton {
  value?: boolean;
  defaultValue?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  id?: string;
  loading?: boolean; // Spinner when toggling
}
