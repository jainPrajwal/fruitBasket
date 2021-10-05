import { useContext } from "react";
import { AlertContext } from "../contexts/alert-context";

const useAlert = () => {
  return useContext(AlertContext);
};

export { useAlert };
