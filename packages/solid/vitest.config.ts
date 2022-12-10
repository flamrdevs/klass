import { defineConfig } from "vitest/config";

import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid() as any],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
  },
});
