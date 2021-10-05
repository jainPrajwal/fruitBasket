import { useCart } from "../hooks/useCart";
import { FruitItemInCart } from "./FruitItemInCart";

const FruitsInCart = () => {
  const { state: cartObj } = useCart();
  const { cart, status } = cartObj;

  return (
    <>
      {status === "loading" ? (
        <div className="loading-img-wrapper">
          <img src={`/assets/Spinner.gif`} alt="loading" className="loading" />
        </div>
      ) : (
        <></>
      )}
      {cart.map((fruit) => {
        return <FruitItemInCart fruit={fruit} key={fruit.codes} />;
      })}
    </>
  );
};

export { FruitsInCart };
