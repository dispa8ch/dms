interface FormInput {
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  value?: string | number;
  type?: "text" | "number" | "email" | "password" | "select";
  style?: React.CSSProperties;
  validationError?: string;
}

interface FormSelectOption {
  value: string;
  label: string;
}

interface InputData {
  placeholder: string;
  name: string;
  action: (e: any) => void;
  valid: boolean;
  type: "text" | "password" | "email" | "date" | "datetime";
}

interface SignUpInputs {
  business: InputData[];
  user: InputData[];
}

interface DashboardData {
  stats: Stats;
  recentOrders: RecentOrder[];
  inTransitOrders: InTransitOrder[];
  newOrders: any[];
  monthlySales: MonthlySale[];
  companyInfo: {
    company_name: string;
    company_logo: string;
  };
}

interface Stats {
  total_orders: number;
  total_sales: string;
  todays_deliveries: number;
  completed_deliveries: number;
  total_riders: number;
  assigned_riders: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  pickup_username: string;
  pickup_phone: string;
  pickup_address: string;
  pickup_time: string;
  delivery_receiver_name: string;
  delivery_email: string;
  delivery_phone: string;
  delivery_address: string;
  delivery_time: string;
  delivery_date: string;
  tax_rate: string;
  delivery_fees: string;
  discount: string;
  delivery_instruction: string;
  payment_type: string;
  order_status: string;
  rider_id: any;
  company_id: string;
  completed_at: any;
  created_at: string;
  updated_at: string;
}

interface InTransitOrder {
  id: string;
  order_number: string;
  pickup_username: string;
  pickup_phone: string;
  pickup_address: string;
  pickup_time: string;
  delivery_receiver_name: string;
  delivery_email: string;
  delivery_phone: string;
  delivery_address: string;
  delivery_time: string;
  delivery_date: string;
  tax_rate: string;
  delivery_fees: string;
  discount: string;
  delivery_instruction: string;
  payment_type: string;
  order_status: string;
  rider_id: any;
  company_id: string;
  completed_at: any;
  created_at: string;
  updated_at: string;
}

interface MonthlySale {
  month: string;
  total_sales: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}
