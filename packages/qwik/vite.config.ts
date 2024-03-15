import { defineConfig } from "vite";

import { qwikVite as qwik } from "@builder.io/qwik/optimizer";

import dts from "vite-plugin-dts";

import $env from "./../core/env";

const env = $env();

export default defineConfig({
  mode: "lib",
  build: {
    target: "esnext",
    outDir: "dist",
    lib: {
      entry: ["src/utils.ts", "src/index.tsx", "src/create.tsx", "src/mono/index.tsx", "src/mono/create.tsx"],
      fileName: (format, entry) => `${entry}.qwik.${format === "cjs" ? "cjs" : "mjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "@klass/core/utils", "@builder.io/qwik"],
      output: {
        exports: "named",
        preserveModules: true,
      },
    },
  },
  plugins: [
    qwik(),
    {
      name: "minifier",
      config: function (config) {
        config.build!.minify = env.unminify ? false : "esbuild";
      },
    },
    dts({
      include: ["src/**/*.{ts,tsx}"],
      compilerOptions: {
        removeComments: false,
      },
      staticImport: true,
    }),
  ],
});
