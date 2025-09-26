import { createContext, useState, useContext } from "react";
import Snackbars from "../components/snackBar";

const ToastContext = createContext({});

function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <Snackbars open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};

export default ToastProvider;
