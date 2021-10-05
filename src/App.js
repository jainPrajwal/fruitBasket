import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";

import { getHindiNameForProducts, useAxios } from "./hooks/useAxios";

import "./styles.css";

import { useAlert } from "./hooks/useAlert";
import { AlertSuccess } from "./components/AlertSuccess";
import { AlertDanger } from "./components/AlertDanger";
import { useLanguage } from "./hooks/useLanguage";
import { useEffect } from "react";
import { useProducts } from "./hooks/useProducts";

import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Store } from "./pages/Store";
import { Cart } from "./pages/private/Cart";
import { PrivateRoute } from "./PrivateRoute";
import { useCart } from "./hooks/useCart";
import { fetchCartDetailByUser } from "./reducers/cartReducer";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const url = `https://fruitBasketWithMongo2.prajwaljain.repl.co/products`;

  const { showAlert } = useAlert();
  const { data } = useAxios(url);
  const { language } = useLanguage();
  const { dispatch: cartDispatch } = useCart();
  const { loggedInUser } = useAuth();
  const { dispatch: storeDispatch, state: products } = useProducts();

  const { status: productsStatus } = products;
  useEffect(() => {
    const fetchData = async () => {
      if (data.fruits) {
        const requiredData = await getHindiNameForProducts(data.fruits);
        storeDispatch({
          type: "STATUS",
          payload: "idle"
        });
        storeDispatch({
          type: "LOAD_PRODUCTS",
          payload: requiredData
        });
      }
    };

    fetchData();
  }, [storeDispatch, data]);

  useEffect(() => {
    // const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loadCart = async () => {
      const cart = await fetchCartDetailByUser(loggedInUser);
      cartDispatch({
        type: "STATUS",
        payload: "loading"
      });
      cartDispatch({
        type: "LOAD_CART",
        payload: cart
      });
    };
    console.log("loading cart");
    if (loggedInUser) {
      loadCart();
    }
  }, [loggedInUser]);

  let message = "";
  language === "en" ? (message = "Added to Cart") : (message = "बैग में डाला");
  let Removedmessage = "";
  language === "en"
    ? (Removedmessage = "Removed from Cart")
    : (Removedmessage = "बैग से निकाला");

  return (
    <>
      <div className={`App`}>
        {productsStatus !== "error" && <Navbar />}
        {productsStatus !== "loading" && productsStatus !== "error" && (
          <Container>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/store" element={<Store />} />
              <PrivateRoute path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Container>
        )}

        {showAlert.status === "success" && <AlertSuccess message={message} />}
        {showAlert.status === "danger" && (
          <AlertDanger message={Removedmessage} />
        )}
        {productsStatus === "loading" ? (
          language === "en" ? (
            <>
              <div className="loading-img-wrapper">
                <img
                  src="https://64.media.tumblr.com/b925124092d60cd59ee6b0457d03a834/tumblr_n8cuzlJvWd1svwlszo1_500.gif"
                  alt="loading"
                  className="loading"
                />
                <p>fruits are ripening </p>
              </div>
            </>
          ) : (
            <p>आपके फल पक रहे हैं </p>
          )
        ) : (
          <div />
        )}
        {productsStatus === "error" ? (
          language === "en" ? (
            <>
              <div className="loading-img-wrapper">
                <img
                  src="https://image.flaticon.com/icons/png/128/4457/4457164.png"
                  alt="error"
                  className="error"
                />
                <p>oops seems there was some error!Try reloading..</p>
              </div>
            </>
          ) : (
            <p>उफ़ लगता है कुछ त्रुटि हुई थी!!</p>
          )
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
