import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./contexts/cart-context";
import App from "./App";
import { RouteProvider } from "./contexts/route-context";
import { AlertProvider } from "./contexts/alert-context";
import { ProductsProvider } from "./contexts/products-context";
import { LocalizationProvider } from "./contexts/locale-context";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <RouteProvider>
          <CartProvider>
            <LocalizationProvider>
              <AlertProvider>
                <ProductsProvider>
                  <App />
                </ProductsProvider>
              </AlertProvider>
            </LocalizationProvider>
          </CartProvider>
        </RouteProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
