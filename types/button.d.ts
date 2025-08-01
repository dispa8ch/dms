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
