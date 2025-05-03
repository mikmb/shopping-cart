import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEventLib from "@testing-library/user-event";
import Shop from "./Shop";
import { CartProvider } from "../context/CartContext";
import { test, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  vi.clearAllMocks();
});

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
}

// Renders loading state and then products
test("renders loading spinner and then product list", async () => {
  renderWithProviders(<Shop />);
  expect(screen.getByText(/loading products/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });
});

// Search functionality
test("filters product by search text", async () => {
  const user = userEventLib.setup();
  renderWithProviders(<Shop />);

  await waitFor(() => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });

  const searchInput = screen.getByPlaceholderText(/search products/i);
  await user.type(searchInput, "nonexistent");

  await waitFor(() => {
    expect(screen.getByText(/no match found/i)).toBeInTheDocument();
  });

  await user.clear(searchInput);
  await waitFor(() => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });
});

// Clear input button
test("clear button clears search input", async () => {
  const user = userEventLib.setup();
  renderWithProviders(<Shop />);
  await waitFor(() => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText(/search products/i);

  await user.clear(input);
  await user.type(input, "test");
  expect(input).toHaveValue("test");

  const clearButton = screen.getByRole("button", { name: /clear search/i });
  await user.click(clearButton);
  expect(input).toHaveValue("");
});
