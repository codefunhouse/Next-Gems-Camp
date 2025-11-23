"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Modal = ({
  isOpen,
  onClose,
  children,
  childrenStyles,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  childrenStyles?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto">
            <motion.div
              initial={{ y: "100vh" }}
              animate={{
                y: 0,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 150,
                  mass: 0.8,
                },
              }}
              exit={{
                y: "100vh",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              className={twMerge(
                "max-w-fit mx-4 pointer-events-auto",
                childrenStyles
              )}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
