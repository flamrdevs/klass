import { defineConfig } from "vitest/config";

import solid from "vite-plugin-solid";

import env from "./vite.env";

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    watch: env.true("WATCH"),
  },
});
