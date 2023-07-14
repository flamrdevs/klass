import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

import env from "./vite.env";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    watch: env.watch,
    deps: {
      inline: [/react/, /react-dom/],
    },
  },
});
