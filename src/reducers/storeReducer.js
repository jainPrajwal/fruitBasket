const storeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      const data = action.payload;

      return { ...state, store: data };

    case "STATUS":
      return { ...state, status: action.payload };

    default:
      console.log("store default case");
  }
};
const initialState = {
  store: [],
  status: "idle"
};
export { storeReducer, initialState };
