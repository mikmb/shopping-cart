import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./Checkout.css";
function Checkout() {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useCart();

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <>
      <NavBar />
      <div className="checkout-page">
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <Link to="/shop">Go to Shop</Link>
          </p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="item-mini-image"
                  />
                  <h3 className="item-title">{item.title}</h3>
                  <div className="controls-and-total-container">
                    <div className="controls">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item, 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>
                        🗑️
                      </button>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <h2>Total: ${cartTotal.toFixed(2)}</h2>
              <Link to="/payment">Pay Now</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Checkout;
