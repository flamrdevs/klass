import { defineConfig } from "vite";

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
      entry: "./src/index.tsx",
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
          include: ["src/**/!(*.test).{ts,tsx}"],
          exclude: ["node_module/**", "src/tests.{ts,tsx}"],
        })
      : null,
  ],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    watch: env.watch,
    deps: {
      inline: [/react/, /react-dom/],
    },
  },
});
