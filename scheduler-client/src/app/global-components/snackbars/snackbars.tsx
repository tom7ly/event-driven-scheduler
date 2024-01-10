import { useEffect, useState } from "react";

type SnackbarProps = {
  snackbar: SnackbarState;
  setSnackbar: (snackbar: SnackbarState) => void;
};

export type SnackbarState = {
  isVisible: boolean;
  message: string;
  err?: boolean;
};

export const Snackbar: React.FC<SnackbarProps> = ({
  snackbar,
  setSnackbar,
}) => {
  useEffect(() => {
    if (snackbar.isVisible) {
      const timer = setTimeout(() => {
        setSnackbar({ ...snackbar, isVisible: false });
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [snackbar, setSnackbar]);

  if (!snackbar.isVisible) return null;

  return (
    <div className="fixed bottom-0 mb-4 w-full flex justify-center animate-slide-up">
      <div
        className={`text-white text-sm font-semibold px-4 py-2 rounded shadow ${
          snackbar.err ? "bg-red-500":"bg-green-500"  
        }`}
      >
        {snackbar.message}
      </div>
    </div>
  );
};
