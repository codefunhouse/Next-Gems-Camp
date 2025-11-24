"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Add styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scrolling when modal closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

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
            className="fixed inset-0 bg-black/50 z-40"
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
              className={twMerge("pointer-events-auto", childrenStyles)}
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
