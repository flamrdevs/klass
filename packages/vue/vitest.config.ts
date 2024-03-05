import { defineConfig } from "vitest/config";

import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), jsx()],
  test: {
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/vue/],
      },
    },
  },
});
