import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import NavBar from "./NavBar";

function Payment() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted (fake). Redirecting...");
    clearCart();
    navigate("/Success");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <NavBar />

      <div className="payment-page">
        <h1>Payment</h1>
        <form className="payment-form" onSubmit={handleSubmit}>
          <label>
            Name on Card
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Card Number
            <input type="text" placeholder="1234 5678 9012 3456" required />
          </label>
          <label>
            Expiration Date
            <input type="text" placeholder="MM/YY" required />
          </label>
          <label>
            CVV
            <input type="text" placeholder="123" required />
          </label>

          <div className="payment-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>

          <button type="submit" className="pay-button">
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
}

export default Payment;
