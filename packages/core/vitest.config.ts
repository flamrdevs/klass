import { defineConfig } from "vitest/config";

import env from "./vite.env";

export default defineConfig({
  plugins: [],
  test: {
    include: ["**/*.test.{ts,tsx}"],
    watch: env.watch,
  },
});
