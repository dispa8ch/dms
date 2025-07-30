type Dispa8chButtonColor = "purple-main" | "black" | "grey" | "blue";
type Dispa8chButtonType = "primary" | "secondary" | "outline" | "link";

interface Dispa8chButton {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: Dispa8chButtonColor;
  type: Dispa8chButtonType;
  disabled?: boolean;
  path?: string;
  loading?: boolean;
  link_type?: "text" | "outline";
}
