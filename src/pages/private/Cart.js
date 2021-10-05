import { useCart } from "/src/hooks/useCart";
import { FruitsInCart } from "/src/components/FruitsInCart";
import EmptyCartImage from "/src/images/EmptyCartImage.svg";
import { useLanguage } from "/src/hooks/useLanguage";

const Cart = () => {
  const { state: cartObj } = useCart();
  const { cart, status } = cartObj;

  const { language } = useLanguage();

  if (language === "en") {
    return (
      <>
        <div
          className="header header-secondary"
          style={{ margin: "1rem 0rem" }}
        >
          {" "}
          Your Cart{" "}
        </div>
        {cart?.length <= 0 && (
          <>
            <div className="header header-tertiary">
              {" "}
              An empty cart doesn't look pretty :){" "}
            </div>
            <div className="section-header">
              <img
                src={EmptyCartImage}
                alt="empty cart"
                className="empty-cart-image"
              />
            </div>
          </>
        )}

        <div className="card">
          <div className="card-container">
            <FruitsInCart />
          </div>
        </div>
      </>
    );
  } else if (language === "hi") {
    return (
      <>
        <div
          className="header header-secondary"
          style={{ margin: "1rem 0rem" }}
        >
          {" "}
          आपका बैग{" "}
        </div>
        {cart.length <= 0 && (
          <>
            <div className="header header-tertiary">
              {" "}
              {" एक खाली बैग सुंदर नहीं लगता! :)"}
            </div>
            <div className="section-header">
              <img
                src={EmptyCartImage}
                alt="empty cart"
                className="empty-cart-image"
              />
            </div>
          </>
        )}

        <div className="card">
          <div className="card-container">
            <FruitsInCart />
          </div>
        </div>
      </>
    );
  }
};

export { Cart };
