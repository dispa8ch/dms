interface Dispa8chButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "link" | "text"; // Optional style control
  loading?: boolean;
  link_type?: "text" | "outline";
  path?: string;
}
