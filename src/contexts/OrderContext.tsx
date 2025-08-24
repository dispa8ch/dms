import { createContext, useState } from "react";
export const OrderContext = createContext<{
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
} | null>(null);
export default function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [order, setOrder] = useState<Order | null>(null);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
