import { OrderContext } from "@/contexts/OrderContext";
import { useContext } from "react";

export function useOrder() {
  const context = useContext(OrderContext)!;
  if (!context) {
    throw new Error("Please use inside of OrderProvider!");
  }
  return context;
}
