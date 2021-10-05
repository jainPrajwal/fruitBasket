import { useContext } from "react";
import { RouteContext } from "../contexts/route-context";

const useRoute = () => {
  return useContext(RouteContext);
};
export { useRoute };
