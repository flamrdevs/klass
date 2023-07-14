import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

import env from "./vite.env";

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [dts()],
});
