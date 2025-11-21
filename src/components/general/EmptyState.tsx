import { ReactNode } from "react";

function EmptyState({ message }: { message: string | ReactNode }) {
  return (
    <>
      {typeof message === "string" ? (
        <p className="text-slate-300 text-base sm:text-lg">{message}</p>
      ) : (
        message
      )}
    </>
  );
}

export default EmptyState;
