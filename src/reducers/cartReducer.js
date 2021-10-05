import axios from "axios";

export const addToCartOnServer = async ({ fruit, loggedInUser }) => {
  try {
    const response = await axios.post(
      `https://fruitBasketWithMongo2.prajwaljain.repl.co/cart/${loggedInUser.userId}`,
      fruit
    );

    return response?.data?.cart?.cartItems;
  } catch (err) {
    return;
  }
};

export const fetchCartDetailByUser = async (loggedInUser) => {
  try {
    // console.log(`${loggedInUser.userId}`);
    const response = await axios.get(
      `https://fruitBasketWithMongo2.prajwaljain.repl.co/cart/${loggedInUser.userId}`
    );
    console.log("response...", response);
    return response?.data?.user?.cart?.cartItems
      ? response.data.user.cart.cartItems
      : [];
  } catch (err) {
    return;
  }
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "STATUS":
      return { ...state, status: action.payload };
    case "LOAD_CART":
      return { cart: action.payload, status: "idle" };

    case "ADD_TO_CART":
      return { cart: action.payload, status: "idle" };
    case "UPDATE_QUANTITY":
      return { cart: action.payload, status: "idle" };

    case "REMOVE_ITEM_FROM_CART":
      console.log("action.payload", action.payload);
      return { cart: action.payload, status: "idle" };

    case "RESET_CART":
      return { ...state, cart: [] };

    default:
      console.log("into default case");
      return state;
  }
};
const initialState = {
  cart: [],
  status: "idle"
};
export { cartReducer, initialState };
