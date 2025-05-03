import React from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockResponse = {
  id: 1,
  title: "Test Product",
  description: "Test description",
  category: "men's clothing",
  price: 100,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve([mockResponse]),
  })
);
