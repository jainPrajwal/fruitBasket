import { Link } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";

import { addToCartOnServer } from "../reducers/cartReducer";

const FruitItemInStore = ({ fruit }) => {
  const { state: cartObj, dispatch: cartDispatch } = useCart();
  // const {  } = useCart();
  const { cart } = cartObj;
  const { setShowAlert } = useAlert();
  const { language } = useLanguage();

  const { loggedInUser } = useAuth();

  const checkIfFruitIsAlreadyPresentInCart = (fruit) => {
    if (cart?.some((item) => item.codes === fruit.codes)) {
      return true;
    }
    return false;
  };

  const getQuantityOfFruitPresentInCart = (fruit) => {
    return cart?.reduce((acc, current) => {
      if (current.codes === fruit.codes) acc = current.quantity;
      return acc;
    }, 0);
  };

  const lessProductsRemaining =
    fruit.maxQuantity - getQuantityOfFruitPresentInCart(fruit) <= 2 &&
    fruit.maxQuantity - getQuantityOfFruitPresentInCart(fruit) > 0;

  if (language === "en") {
    return (
      <div className="card-wrapper">
        {lessProductsRemaining && (
          <span className="badge-hurry">Hurry!! Only few left</span>
        )}
        <div className="card-body">
          <div className="card-item">
            <div className="card-image-container">
              <div className="fruit">{fruit.char}</div>
            </div>
            <div className="card-content">
              <div
                className="card-title header header-secondary"
                style={{ color: "white" }}
              >
                {fruit.name}
              </div>
              <div className="card-subtitle text text-secondary">
                {fruit.subgroup}
              </div>

              <div>
                {checkIfFruitIsAlreadyPresentInCart(fruit) ? (
                  <Link to="/cart">
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        margin: "1rem 0rem"
                      }}
                      disabled={
                        getQuantityOfFruitPresentInCart(fruit) >=
                        fruit.maxQuantity
                      }
                    >
                      Go to cart
                    </button>
                  </Link>
                ) : (
                  loggedInUser && (
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        margin: "1rem 0rem"
                      }}
                      disabled={
                        getQuantityOfFruitPresentInCart(fruit) >=
                        fruit.maxQuantity
                      }
                      onClick={() => {
                        const addToCartHandler = async () => {
                          cartDispatch({
                            type: "STATUS",
                            payload: "loading"
                          });

                          const cart = await addToCartOnServer({
                            fruit,
                            loggedInUser
                          });
                          setShowAlert((prevState) => ({
                            ...prevState,
                            status: "success",
                            whatWasAddedToCart: fruit.name
                          }));

                          cartDispatch({
                            type: "ADD_TO_CART",
                            payload: cart
                          });
                        };
                        addToCartHandler();
                      }}
                    >
                      {getQuantityOfFruitPresentInCart(fruit) >=
                      fruit.maxQuantity
                        ? `Out Of Stock!`
                        : `Add to cart`}
                      <i
                        className="fas fa-shopping-cart"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (language === "hi") {
    return (
      <div className="card-wrapper">
        {lessProductsRemaining && (
          <span className="badge-hurry">जल्दी करो!! कुछ ही बचा है</span>
        )}
        <div className="card-body">
          <div className="card-item">
            <a href="true" onClick={(e) => e.preventDefault()}>
              <div className="card-image-container">
                <div className="fruit">{fruit.char}</div>
              </div>
              <div className="card-content">
                <div
                  className="card-title header header-secondary"
                  style={{ color: "white" }}
                >
                  {fruit.hi}
                </div>
                <div className="card-subtitle text text-secondary">{"फल"}</div>

                <div>
                  {checkIfFruitIsAlreadyPresentInCart(fruit) ? (
                    <Link to="/cart">
                      <button
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          margin: "1rem 0rem"
                        }}
                        disabled={
                          getQuantityOfFruitPresentInCart(fruit) >=
                          fruit.maxQuantity
                        }
                      >
                        {"बैग देखें"}
                      </button>
                    </Link>
                  ) : (
                    loggedInUser && (
                      <button
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          margin: "1rem 0rem"
                        }}
                        disabled={
                          getQuantityOfFruitPresentInCart(fruit) >=
                          fruit.maxQuantity
                        }
                        onClick={() => {
                          const addToCartHandler = async () => {
                            cartDispatch({
                              type: "STATUS",
                              payload: "loading"
                            });
                            const cart = await addToCartOnServer({
                              fruit,
                              loggedInUser
                            });
                            setShowAlert((prevState) => ({
                              ...prevState,
                              status: "success",
                              whatWasAddedToCart: fruit.name
                            }));

                            cartDispatch({
                              type: "ADD_TO_CART",
                              payload: cart
                            });
                          };
                          addToCartHandler();
                        }}
                      >
                        {getQuantityOfFruitPresentInCart(fruit) >=
                        fruit.maxQuantity ? (
                          `स्टॉक ख़त्म!`
                        ) : (
                          <>
                            {"बैग में डालें"}
                            <i
                              className="fas fa-shopping-cart"
                              style={{ fontSize: "1rem" }}
                            ></i>
                          </>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export { FruitItemInStore };
