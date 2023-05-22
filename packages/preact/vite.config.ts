import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

import dts from "vite-plugin-dts";

import env from "./vite.env";

export default defineConfig({
  build: {
    ...(env.true("UNMINIFY") ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "preact", "preact/hooks"],
    },
  },
  plugins: [preact(), dts()],
});
