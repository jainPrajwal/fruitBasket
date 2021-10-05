import { createContext, useState } from "react";

export const AlertContext = createContext();
const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    status: "",
    whatWasAddedToCart: "",
    whatWasRemovedFromCart: ""
  });
  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
