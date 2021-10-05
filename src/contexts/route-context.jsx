import { createContext, useState } from "react";

export const RouteContext = createContext();

const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState("store");
  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export { RouteProvider };
