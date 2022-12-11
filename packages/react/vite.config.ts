import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    minify: false,
    target: "esnext",
    lib: {
      name: "KlassReact",
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "react"],
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }) as any,
  ],
});
