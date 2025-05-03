import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("quantity" + quantity);
    if (quantity >= 1) {
      addToCart(product, quantity);
    }

    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.value === "" || (value > 0 && !isNaN(value))) {
      setQuantity(e.target.value === "" ? "" : value);
    } else if (value <= 0) {
      setQuantity(1); // Reset to 1 if invalid or zero/negative
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  const showStars = () => {
    if (!product.rating) return null;

    const rating = Math.round(product.rating.rate);
    return (
      <div className="product-rating">
        <span className="stars">
          {"★".repeat(rating) + "☆".repeat(5 - rating)}
        </span>
        <span className="count"> ({product.rating.count})</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        {product.category && (
          <div className="product-category">{product.category}</div>
        )}
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{product.price.toFixed(2)}</p>
        {showStars()}
      </div>
      <div className="product-actions">
        <div className="quantity-action">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min="1"
            aria-label="Product quantity"
            className="quantity-input"
          />
          <button
            onClick={() => setQuantity((q) => Math.max(1, q + 1))}
            aria-label="Increment Quantity"
          >
            +
          </button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
export default ProductCard;
