import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

const mockAddToCart = vi.fn();
const mockDecreaseQty = vi.fn();
const mockRemoveFromCart = vi.fn();

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cartItems: [
      { id: 1, title: "Item 1", image: "img1", price: 10, quantity: 1 },
      { id: 2, title: "Item 2", image: "img2", price: 20, quantity: 2 },
    ],
    addToCart: mockAddToCart,
    decreaseQty: mockDecreaseQty,
    removeFromCart: mockRemoveFromCart,
  }),
}));

describe("NavBar", () => {
  it("renders app logo and navigation links", () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/shopping cart app/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: /shop/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it("shows cart item count", () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText("3")).toBeInTheDocument(); // quantity of item
  });

  it("toggles dropdown and displays cart items", async () => {
    renderWithRouter(<NavBar />);
    const toggleButton = screen.getByRole("button", {
      name: /toggle cart dropdown/i,
    });
    await userEvent.click(toggleButton);

    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument(); // 2 x $20

    expect(screen.getByText(/go to checkout/i)).toBeInTheDocument();
  });

  it("calls increase, decrease, and remove functions", () => {
    renderWithRouter(<NavBar />);
    fireEvent.click(screen.getByRole("button", { hidden: true }));

    const plusButton = screen.getAllByText("+")[0];
    const minusButton = screen.getAllByText("-")[0];
    const deleteButton = screen.getAllByText("🗑️")[0];

    fireEvent.click(plusButton);
    fireEvent.click(minusButton);
    fireEvent.click(deleteButton);

    expect(mockAddToCart).toHaveBeenCalled();
    expect(mockDecreaseQty).toHaveBeenCalled();
    expect(mockRemoveFromCart).toHaveBeenCalled();
  });

  it("displays multiple items in the cart dropdown", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Open the dropdown
    const toggleButton = screen.getByRole("button", {
      name: /toggle cart dropdown/i,
    });
    await userEvent.click(toggleButton);

    // Check that both item titles are visible
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Check correct quantities and totals
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument(); // 2 × 20

    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });
});
