import { defineConfig } from "vitest/config";

import preact from "@preact/preset-vite";

import dts from "vite-plugin-dts";

const env = {
  command: { build: process.env["COMMAND"] === "build", test: process.env["COMMAND"] === "test" },
  unminify: process.env["UNMINIFY"] === "true",
  watch: process.env["WATCH"] === "true",
};

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: "src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "preact", "preact/hooks", "preact/jsx-runtime"],
    },
  },
  plugins: [
    preact(),
    env.command.build
      ? dts({
          include: ["src/**/*.{ts,tsx}"],
          compilerOptions: {
            removeComments: false,
          },
        })
      : null,
  ],
  test: {
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    watch: env.watch,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/preact/],
      },
    },
  },
});
