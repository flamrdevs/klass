import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import dts from "vite-plugin-dts";

import $env from "./../core/env";

const env = $env();

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: ["src/utils.ts", "src/index.tsx", "src/create.tsx", "src/mono/index.tsx", "src/mono/create.tsx"],
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "@klass/core/utils", "react", "react/jsx-runtime", "react-dom"],
      output: {
        exports: "named",
        preserveModules: true,
      },
    },
  },
  plugins: [
    react(),
    dts({
      include: ["src/**/*.{ts,tsx}"],
      compilerOptions: {
        removeComments: false,
      },
      staticImport: true,
    }),
  ],
});
