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

interface Dispa8chSelect {
  label?: string;
  options: Dispa8chSelectOption[];
  value?: string;
  onChange: (value: Dispa8chSelectOption) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  loading?: boolean;
}

interface Dispa8chSelectOption {
  value: string;
  label: string;
  extra?: any; // Optional extra data
}
