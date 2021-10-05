import { useContext } from "react";
import { CartContext } from "../contexts/cart-context";
const useCart = () => {
  return useContext(CartContext);
};

export { useCart };
