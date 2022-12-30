import { defineConfig } from "vitest/config";

import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact() as any],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
  },
});
