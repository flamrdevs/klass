import { defineConfig } from "vitest/config";

import preact from "@preact/preset-vite";

import env from "./vite.env";

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    watch: env.watch,
    deps: {
      inline: [/preact/],
    },
  },
});
