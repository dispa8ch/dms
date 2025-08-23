import { createContext, useState } from "react";

export const ModalContext = createContext<Modal | undefined>(undefined);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ open, setOpen, key, setKey }}>
      {children}
    </ModalContext.Provider>
  );
}
