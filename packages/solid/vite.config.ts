import { defineConfig } from "vitest/config";

import solid from "vite-plugin-solid";

import dts from "vite-plugin-dts";

const env = {
  command: { build: process.env["COMMAND"] === "build", test: process.env["COMMAND"] === "test" },
  unminify: process.env["UNMINIFY"] === "true",
};

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: ["src/index.tsx", "src/utils.ts", "src/mono.tsx", "src/setup.tsx", "src/mono.setup.tsx"],
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "solid-js", "solid-js/web"],
      output: {
        exports: "named",
      },
    },
  },
  plugins: [
    solid(),
    env.command.build
      ? dts({
          include: ["src/**/*.{ts,tsx}"],
          compilerOptions: {
            removeComments: false,
          },
          staticImport: true,
        })
      : null,
  ],
  test: {
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/solid-js/, /@solidjs\/router/],
      },
    },
  },
});
