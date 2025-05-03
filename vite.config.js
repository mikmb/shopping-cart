import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // ✅ necessary for DOM-based testing
    globals: true, // ✅ allows using `test`, `expect` without importing
    setupFiles: "./src/test/setup.js", // Optional if you want shared test config
  },
});
