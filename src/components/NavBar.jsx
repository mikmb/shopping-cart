import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";

import "./NavBar.css";

function NavBar() {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="app-name-logo">
        Shopping Cart App
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Shop
          </NavLink>
        </li>
      </ul>
      <div className="nav-cart" ref={dropdownRef}>
        {/* <div className="cart-container" onClick={toggleDropdown}>
          <span className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          <span className="cart-item-count">{totalCount}</span>
        </div> */}
        <button
          type="button"
          className="cart-container"
          onClick={toggleDropdown}
          aria-label="Toggle cart dropdown"
        >
          <span className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          <span className="cart-item-count">{totalCount}</span>
        </button>

        {isDropdownOpen && (
          <div className="cart-dropdown">
            {cartItems.length === 0 ? (
              <p className="empty">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item"
                  data-testid="cart-item"
                >
                  <div className="cart-item-img-n-title">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="item-mini-image"
                    />
                    <div className="cart-item-title">{item.title}</div>
                  </div>
                  <div className="cart-controls">
                    <div className="quantity-control">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item, 1)}>+</button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                    <span className="cart-item-total">
                      {" "}
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div className="cart-total">
              <strong>Total:</strong> ${cartTotal.toFixed(2)}
            </div>
            <Link to="/cart" className="checkout-btn" onClick={closeDropdown}>
              Go to Checkout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
