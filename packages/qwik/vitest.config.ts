import { defineConfig } from "vitest/config";

import { qwikVite as qwik } from "@builder.io/qwik/optimizer";

export default defineConfig({
  plugins: [qwik()],
  test: {
    include: ["test/**/*.test.{ts,tsx}"],
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/@builder.io\/qwik/],
      },
    },
  },
});
