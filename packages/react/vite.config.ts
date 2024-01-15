import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

import dts from "vite-plugin-dts";

const env = {
  command: { build: process.env["COMMAND"] === "build", test: process.env["COMMAND"] === "test" },
  unminify: process.env["UNMINIFY"] === "true",
  watch: process.env["WATCH"] === "true",
};

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: "src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "react", "react-dom"],
    },
  },
  plugins: [
    react(env.command.build ? { jsxRuntime: "classic" } : {}),
    env.command.build
      ? dts({
          include: ["src/**/!(*.test).tsx"],
          exclude: ["node_module/**", "src/tests/**"],
          compilerOptions: {
            removeComments: false,
          },
        })
      : null,
  ],
  test: {
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["src/**/*.test.tsx"],
    watch: env.watch,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
    server: {
      deps: {
        inline: [/react/, /react-dom/],
      },
    },
  },
});
