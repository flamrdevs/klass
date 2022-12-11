import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    target: "esnext",
    lib: {
      name: "KlassCore",
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["clsx"],
    },
  },
  plugins: [],
});
