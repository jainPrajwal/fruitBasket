import { useContext } from "react";
import { ProductsContext } from "../contexts/products-context";

const useProducts = () => {
  return useContext(ProductsContext);
};

export { useProducts };
