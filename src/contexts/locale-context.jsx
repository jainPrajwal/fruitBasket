import { createContext, useState } from "react";

export const LocaleContext = createContext();

const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  return (
    <LocaleContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocalizationProvider };
