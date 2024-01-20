import { defineConfig } from "vitest/config";

import { qwikVite as qwik, createOptimizer } from "@builder.io/qwik/optimizer";

import dts from "vite-plugin-dts";

const env = {
  command: { build: process.env["COMMAND"] === "build", test: process.env["COMMAND"] === "test" },
  unminify: process.env["UNMINIFY"] === "true",
  watch: process.env["WATCH"] === "true",
};

export default defineConfig({
  ...(env.command.build ? { mode: "lib" } : {}),
  build: {
    target: "esnext",
    outDir: "dist",
    lib: {
      entry: "src/index.tsx",
      fileName: (format) => `index.qwik.${format === "cjs" ? "cjs" : "mjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "@builder.io/qwik"],
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
    env.command.build
      ? dts({
          include: ["src/**/*.{ts,tsx}"],
          compilerOptions: {
            removeComments: false,
          },
        })
      : null,
  ],
  test: {
    include: ["test/**/*.test.{ts,tsx}"],
    watch: env.watch,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/@builder.io\/qwik/],
      },
    },
  },
});
