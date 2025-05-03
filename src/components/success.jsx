import { Link } from "react-router-dom";
import "./Success.css";

function Success() {
  return (
    <div className="success-page">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <div className="success-actions">
        <Link to="/" className="home-btn">
          Back to Home
        </Link>
        <Link to="/shop" className="shop-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;
