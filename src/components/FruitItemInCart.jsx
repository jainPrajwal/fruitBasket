import axios from "axios";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";

const FruitItemInCart = ({ fruit }) => {
  const { dispatch: cartDispatch } = useCart();

  const { setShowAlert } = useAlert();
  const { language } = useLanguage();
  const { loggedInUser } = useAuth();

  const removeFromCart = async (fruit) => {
    cartDispatch({
      type: "STATUS",
      payload: "loading"
    });

    const resp = await getCartByUserId(loggedInUser);

    const cartId = resp?.data?.user?.cart?._id;
    try {
      const response = await axios.delete(
        `https://fruitBasketWithMongo2.prajwaljain.repl.co/cart/${cartId}/${fruit._id}`
      );

      setShowAlert((prevState) => ({
        ...prevState,
        status: "danger",
        whatWasRemovedFromCart: language === "en" ? fruit.name : fruit.hi
      }));
      cartDispatch({
        type: "REMOVE_ITEM_FROM_CART",
        payload: response?.data?.cart?.cartItems
          ? response?.data?.cart?.cartItems
          : []
      });
    } catch (err) {
      return;
    }

    // setCart(cart.filter((item) => item.codes !== fruit.codes));
  };

  if (language === "en") {
    return (
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
                {fruit.name}
              </div>
              <div
                className="card-subtitle text text-secondary"
                style={{ color: "white" }}
              >
                {fruit.subgroup}
                {
                  <div className="product-quantity">
                    Quantity : {fruit.quantity}
                    <button
                      className="btn btn-primary btn-round"
                      onClick={() => {
                        cartDispatch({
                          type: "STATUS",
                          payload: "loading"
                        });
                        const updatedPropertiesObj = {
                          quantity: fruit.quantity + 1
                        };

                        updateProduct({
                          loggedInUser,
                          fruit,
                          updatedPropertiesObj,
                          cartDispatch
                        });
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-primary btn-round"
                      onClick={() => {
                        const updatedPropertiesObj = {
                          quantity: fruit.quantity - 1
                        };
                        cartDispatch({
                          type: "STATUS",
                          payload: "loading"
                        });
                        updateProduct({
                          loggedInUser,
                          fruit,
                          updatedPropertiesObj,
                          cartDispatch
                        });
                      }}
                    >
                      -
                    </button>
                  </div>
                }
              </div>

              <div className="btn-wrapper">
                <button
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    margin: "1rem 0rem"
                  }}
                  onClick={() => {
                    removeFromCart(fruit);
                  }}
                >
                  {`Remove from cart`}
                  <i
                    className="fas fa-shopping-cart"
                    style={{ fontSize: "1rem" }}
                  ></i>
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  } else if (language === "hi") {
    return (
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
              <div
                className="card-subtitle text text-secondary"
                style={{ color: "white" }}
              >
                {"फल"}
                {
                  <div className="product-quantity">
                    {"मात्रा"} : {fruit.quantity}
                    <button
                      className="btn btn-primary btn-round"
                      onClick={() => {
                        cartDispatch({
                          type: "STATUS",
                          payload: "loading"
                        });
                        const updatedPropertiesObj = {
                          quantity: fruit.quantity + 1
                        };

                        updateProduct({
                          loggedInUser,
                          fruit,
                          updatedPropertiesObj,
                          cartDispatch
                        });
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-primary btn-round"
                      onClick={() => {
                        cartDispatch({
                          type: "STATUS",
                          payload: "loading"
                        });
                        const updatedPropertiesObj = {
                          quantity: fruit.quantity - 1
                        };
                        updateProduct({
                          loggedInUser,
                          fruit,
                          updatedPropertiesObj,
                          cartDispatch
                        });
                      }}
                    >
                      -
                    </button>
                  </div>
                }
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    margin: "1rem 0rem"
                  }}
                  onClick={() => {
                    removeFromCart(fruit);
                  }}
                >
                  {`बैग से निकालें`}
                  <i
                    className="fas fa-shopping-cart"
                    style={{ fontSize: "1rem" }}
                  ></i>
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
};

export { FruitItemInCart };
async function updateProduct({
  loggedInUser,
  fruit,
  updatedPropertiesObj,
  cartDispatch
}) {
  const resp = await getCartByUserId(loggedInUser);

  const cartId = resp?.data?.user?.cart?._id;
  try {
    const response = await axios.post(
      `https://fruitBasketWithMongo2.prajwaljain.repl.co/cart/${cartId}/${fruit._id}`,
      updatedPropertiesObj
    );

    cartDispatch({
      type: "UPDATE_QUANTITY",
      payload: response?.data?.cart?.cartItems
    });
  } catch (err) {
    return;
  }
}

async function getCartByUserId(loggedInUser) {
  try {
    return await axios.get(
      `https://fruitBasketWithMongo2.prajwaljain.repl.co/cart/${loggedInUser.userId}`
    );
  } catch (err) {
    return err;
  }
}
