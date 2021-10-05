import { createContext, useReducer } from "react";
import { initialState } from "../reducers/storeReducer";
import { storeReducer } from "../reducers/storeReducer";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  // const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
