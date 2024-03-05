import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    include: ["test/**/*.test.ts"],
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
  },
});
