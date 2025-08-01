interface Dispa8chInput {
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "phone"
    | "currency";
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

interface Dispa8chDropDown {
  label?: string;
  options: Dispa8chDropDownOption[];
  value?: string;
  onChange: (value: Dispa8chDropDownOption) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  loading?: boolean;
}

interface Dispa8chDropDownOption {
  value: string;
  label: string;
  extra?: any; // Optional extra data
}

interface Dispa8chSelect {
  options: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  defaultValue?: string | number;
}

interface Dispa8chFilter {
  title: string;
  sections: FilterSection[];
}

interface FilterSection {
  label: string;
  type: "radio" | "checkbox";
  section: FilterItem[];
}

interface FilterItem {
  id: string;
  label: string;
  value: string;
}

interface SearchInput {
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  icon?: React.ReactNode;
  label?: string;
  width?: number;
}

interface Dispa8chCheckbox {
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}
