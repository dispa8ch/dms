interface Order {
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
  rider_id: string | null;
  company_id: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  item_name: string;
  item_price: string;
  item_quantity: string;
  id: string | null;
}

interface CreateOrder {
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
  tax_rate: number;
  delivery_fees: number;
  discount: number;
  delivery_instruction: string;
  payment_type: string;
  order_status: string;
  rider_id: any;
  company_id: string;
  items: CreateOrderItem[];
}

interface CreateOrderItem {
  item_name: string;
  item_price: number;
  item_quantity: number;
}

interface CreateOrderResponse {
  id: string;
  order_status: string;
  payment_type: string;
  created_at: string;
  order_number: string;
}
