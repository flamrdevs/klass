import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

import dts from "vite-plugin-dts";

import $env from "./../core/env";

const env = $env();

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: ["src/utils.ts", "src/index.tsx", "src/setup.tsx", "src/mono/index.tsx", "src/mono/setup.tsx"],
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "@klass/core/utils", "preact", "preact/hooks", "preact/jsx-runtime"],
      output: {
        exports: "named",
        preserveModules: true,
      },
    },
  },
  plugins: [
    preact(),
    dts({
      include: ["src/**/*.{ts,tsx}"],
      compilerOptions: {
        removeComments: false,
      },
      staticImport: true,
    }),
  ],
});
