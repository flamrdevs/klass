import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

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
      external: ["@klass/core", "react", "react-dom"],
    },
  },
  plugins: [react({ jsxRuntime: "classic" }), dts()],
});
