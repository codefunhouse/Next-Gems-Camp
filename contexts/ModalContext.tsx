// contexts/ModalContext.tsx
import Modal from "@/components/general/modals/Modal";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const location = useLocation();

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 300);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
}

export { ModalContext };
