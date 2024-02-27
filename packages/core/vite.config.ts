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
      entry: ["src/index.ts", "src/utils.ts", "src/setup.ts", "src/group.ts", "src/slots.ts"],
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["clsx"],
      output: {
        exports: "named",
      },
    },
  },
  plugins: [
    env.command.build
      ? dts({
          include: ["src/**/*.ts"],
          compilerOptions: {
            removeComments: false,
          },
          staticImport: true,
        })
      : null,
  ],
  test: {
    include: ["test/**/*.test.ts"],
    watch: env.watch,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
  },
});
