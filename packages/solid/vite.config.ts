import { defineConfig } from "vite";

import solid from "vite-plugin-solid";

import dts from "vite-plugin-dts";

import env from "./vite.env";

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "solid-js", "solid-js/web"],
    },
  },
  plugins: [
    solid(),
    dts({
      include: ["src/**/!(*.test).{ts,tsx}"],
      exclude: ["node_module/**", "src/tests.{ts,tsx}"],
    }),
  ],
});
