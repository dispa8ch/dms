import { createContext, useState } from "react";

export const ModalContext = createContext<Modal>({
  open: false,
  setOpen: () => {
    throw new Error("Do not use outside of modal");
  },
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
