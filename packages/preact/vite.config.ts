import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

export default defineConfig({
  build: {
    minify: false,
    target: "esnext",
    lib: {
      name: "KlassPreact",
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "preact", "preact/hooks"],
    },
  },
  plugins: [preact() as any],
});
