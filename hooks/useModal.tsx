"use client";
// contexts/useModal.ts
import { ModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
