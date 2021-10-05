import axios from "axios";
import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";
export const getHindiNameForProducts = (Products) => {
  return Products.map((fruit) => {
    switch (fruit.name) {
      case "grapes":
        return { ...fruit, hi: "अंगूर" };
      case "banana":
        return { ...fruit, hi: "केला" };
      case "melon":
        return { ...fruit, hi: "खरबूज" };
      case "watermelon":
        return { ...fruit, hi: "तरबूज" };
      case "tangerine":
        return { ...fruit, hi: "संतरा" };
      case "lemon":
        return { ...fruit, hi: "नींबू" };
      case "pineapple":
        return { ...fruit, hi: "अनानास" };
      case "mango":
        return { ...fruit, hi: "आम" };
      case "red apple":
        return { ...fruit, hi: "लाल सेब" };
      case "green apple":
        return { ...fruit, hi: "हरा सेब" };
      case "pear":
        return { ...fruit, hi: "नाशपाती" };
      case "peach":
        return { ...fruit, hi: "आड़ू" };
      case "cherries":
        return { ...fruit, hi: "चेरी" };
      case "strawberry":
        return { ...fruit, hi: "स्ट्रॉबेरी" };
      case "blueberries":
        return { ...fruit, hi: "ब्लू बैरीज़" };
      case "kiwi fruit":
        return { ...fruit, hi: "कीवी फल" };
      case "tomato":
        return { ...fruit, hi: "टमाटर" };
      case "olive":
        return { ...fruit, hi: "जैतून" };
      case "coconut":
        return { ...fruit, hi: "नारियल" };

      default:
        return fruit;
    }
  });
};

const useAxios = (url) => {
  const loading = "loading";
  const error = "error";

  const [data, setData] = useState([]);
  const { dispatch: storeDispatch } = useProducts();
  useEffect(() => {
    storeDispatch({
      type: "STATUS",
      payload: loading
    });
    const getFruitsFromServer = async () => {
      try {
        const { data } = await axios.get(url);

        setData(data);
      } catch (err) {
        storeDispatch({
          type: "STATUS",
          payload: error
        });
      } finally {
        // setStatus("idle");
      }
    };
    setTimeout(() => {
      getFruitsFromServer();
    }, 2000);
  }, [url, setData, storeDispatch]);

  return { data };
};

export { useAxios };
