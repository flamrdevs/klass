import { defineConfig } from "vite";

import solid from "vite-plugin-solid";

export default defineConfig({
  build: {
    minify: false,
    target: "esnext",
    lib: {
      name: "KlassSolid",
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "solid-js", "solid-js/web"],
    },
  },
  plugins: [solid() as any],
});
