import { useContext } from "react";
import { LocaleContext } from "../contexts/locale-context";

const useLanguage = () => {
  return useContext(LocaleContext);
};

export { useLanguage };
