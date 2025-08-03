import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Please use inside of ModalProvider!");
  }

  return context;
}
