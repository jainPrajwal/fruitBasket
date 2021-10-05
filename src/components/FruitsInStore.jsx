import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { FruitItemInStore } from "./FruitItemInStore";

const FruitsInStore = () => {
  const { state: products } = useProducts();
  const { state: cartObj } = useCart();
  const { status } = cartObj;

  return (
    <>
      {status === "loading" ? (
        <div className="loading-img-wrapper">
          <img src={`/assets/Spinner.gif`} alt="loading" className="loading" />
        </div>
      ) : (
        <></>
      )}
      {products.store.map((fruit) => {
        return <FruitItemInStore fruit={fruit} key={fruit.codes} />;
      })}
    </>
  );
};

export { FruitsInStore };
