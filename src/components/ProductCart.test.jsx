import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

// Mock the useCart hook

const addToCartMock = vi.fn();

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}));

const sampleProduct = {
  id: 1,
  title: "Sample Product",
  price: 19.99,
  category: "Sample Category",
  description: "A great product",
  image: "https://via.placeholder.com/150",
  rating: {
    rate: 4.2,
    count: 120,
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product info correctly", () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("Sample Category")).toBeInTheDocument();
    expect(screen.getByText("19.99")).toBeInTheDocument();
    expect(screen.getByAltText("Sample Product")).toBeInTheDocument();
  });

  it("increments and decrements quantity correctly", () => {
    render(<ProductCard product={sampleProduct} />);
    const input = screen.getByLabelText(/product quantity/i);
    const increment = screen.getByLabelText(/increment quantity/i);
    const decrement = screen.getByLabelText(/decrease quantity/i);

    expect(input.value).toBe("1");

    fireEvent.click(increment);
    expect(input.value).toBe("2");

    fireEvent.click(decrement);
    expect(input.value).toBe("1");

    fireEvent.click(decrement);
    expect(input.value).toBe("1"); // doesn't go below 1
  });

  it("resets to 1 on blur if input is empty or invalid", () => {
    render(<ProductCard product={sampleProduct} />);
    const input = screen.getByLabelText(/product quantity/i);

    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
    fireEvent.blur(input);
    expect(input.value).toBe("1");

    fireEvent.change(input, { target: { value: "-2" } });
    fireEvent.blur(input);
    expect(input.value).toBe("1");
  });

  it("calls addToCart with the correct quantity and resets input", async () => {
    const { useCart } = await import("../context/CartContext");
    const addToCartMock = useCart().addToCart;

    render(<ProductCard product={sampleProduct} />);
    const input = screen.getByLabelText(/product quantity/i);
    const button = screen.getByText(/add to cart/i);

    fireEvent.change(input, { target: { value: "4" } });
    fireEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith(sampleProduct, 4);
    expect(input.value).toBe("1"); // resets after add
  });

  it("resets quantity to 1 on blur if input is invalid (empty, 0, or non-numeric)", () => {
    render(<ProductCard product={sampleProduct} />);

    const input = screen.getByLabelText(/product quantity/i);

    // Empty string
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
    expect(input.value).toBe("1");

    // Zero
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.blur(input);
    expect(input.value).toBe("1");

    // Negative
    fireEvent.change(input, { target: { value: "-3" } });
    fireEvent.blur(input);
    expect(input.value).toBe("1");

    // Non-numeric string
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.blur(input);
    expect(input.value).toBe("1");

    // Valid value
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.blur(input);
    expect(input.value).toBe("5"); // should stay unchanged
  });

  it("increments and decrements quantity correctly", () => {
    render(<ProductCard product={sampleProduct} />);

    const input = screen.getByLabelText(/product quantity/i);
    const incrementBtn = screen.getByRole("button", {
      name: /increment quantity/i,
    });
    const decrementBtn = screen.getByRole("button", {
      name: /decrease quantity/i,
    });

    // Initial value
    expect(input.value).toBe("1");

    // Click +
    fireEvent.click(incrementBtn);
    expect(input.value).toBe("2");

    fireEvent.click(incrementBtn);
    expect(input.value).toBe("3");

    // Click -
    fireEvent.click(decrementBtn);
    expect(input.value).toBe("2");

    fireEvent.click(decrementBtn);
    expect(input.value).toBe("1");

    // Should not go below 1
    fireEvent.click(decrementBtn);
    expect(input.value).toBe("1");
  });
});
