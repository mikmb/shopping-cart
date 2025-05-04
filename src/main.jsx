import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Shop from "./components/Shop.jsx";
import Checkout from "./components/Checkout.jsx";
import Payment from "./components/Payment.jsx";
import Success from "./components/Success.jsx";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cart",
    element: <Checkout />,
  },
  { path: "/payment", element: <Payment /> },
  { path: "/success", element: <Success /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
