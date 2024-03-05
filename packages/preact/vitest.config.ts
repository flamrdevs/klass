import { defineConfig } from "vitest/config";

import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/preact/],
      },
    },
  },
});
