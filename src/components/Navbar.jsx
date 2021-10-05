import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";

const Navbar = () => {
  const { state: cartObj, dispatch: cartDispatch } = useCart();
  const { cart } = cartObj;
  const { language, setLanguage } = useLanguage();
  const { loggedInUser, logout } = useAuth();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="navbar nav">
         {" "}
        <div
          className="header header-tertiary"
          style={{
            marginBottom: 0,
            marginRight: "auto",
            lineHeight: "1rem"
          }}
        >
          FruitBasket
          <span role="img" aria-label="cherry">
            🍒{" "}
          </span>
        </div>
        <div className="badge-outer-wrapper">
          {!loggedInUser ? (
            <div className="badge-wrapper">
              <Link to="/login">
                <img
                  height="25px"
                  width="25px"
                  src="/assets/icons8-user-30.png"
                  alt=""
                />
              </Link>
            </div>
          ) : (
            <div className="badge-wrapper">
              <i
                className="fas fa-sign-out-alt"
                style={{ fontSize: "1.7rem" }}
                onClick={() => {
                  cartDispatch({
                    type: "RESET_CART"
                  });
                  logout();
                }}
              ></i>
            </div>
          )}
          {loggedInUser ? (
            <div className="badge-wrapper">
              <i
                className="fas fa-language"
                onClick={() => {
                  language === "en" ? setLanguage("hi") : setLanguage("en");
                }}
              ></i>
            </div>
          ) : (
            <> </>
          )}
          <div className="badge-wrapper">
            <Link to="/store">
              <i className="fas fa-store"></i>
            </Link>
          </div>
          <div className="badge-wrapper">
            <Link to="/cart">
              <i className="fas fa-shopping-cart">
                   
                {cart?.length > 0 && (
                  <span className="cart-count">
                    {cart.reduce((acc, current) => {
                      acc += current.quantity;
                      return acc;
                    }, 0)}
                  </span>
                )}
              </i>
               
            </Link>
          </div>
        </div>
          
      </div>
    </>
  );
};

export { Navbar };
