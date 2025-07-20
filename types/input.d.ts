interface Dispa8chInput {
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "phone";
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  options?: string[]; // Only for 'select' type
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: React.FocusEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
}
