import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Shop.css";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["all"]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const { addToCart } = useCart();
  useEffect(() => {
    // Fetch products from FakeStoreAPI
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setProducts(response);
        const uniqueCategories = [
          ...new Set(response.map((product) => product.category)),
        ];
        setCategories(["all", ...uniqueCategories]);
        setDisplayedProducts(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  //   Filter products based on searchText
  useEffect(() => {
    let filteredProducts = [...products];

    // category filter
    if (categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    // searchText filter
    if (searchText.trim() !== "") {
      const text = searchText.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(text) ||
          product.description.toLowerCase().includes(text) ||
          product.category.toLowerCase().includes(text)
      );
    }

    setDisplayedProducts(filteredProducts);
  }, [searchText, categoryFilter, products]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="shop-page-status">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="shop-page-status error">
          Error loading products: {error}
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <div className="shop-page">
        <div className="shop-controls-container">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchText("")}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          <select
            className="filter-dropdown"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {displayedProducts.length === 0 ? (
          <div className="shop-page-status">No match found.</div>
        ) : (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Shop;
