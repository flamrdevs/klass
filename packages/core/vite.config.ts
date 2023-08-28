import { defineConfig } from "vitest/config";

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
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    env.command.build
      ? dts({
          include: ["src/**/!(*.test).ts"],
          exclude: ["node_module/**", "src/tests.ts"],
          compilerOptions: {
            removeComments: false,
          },
        })
      : null,
  ],
  test: {
    include: ["**/*.test.{ts,tsx}"],
    watch: env.watch,
  },
});
