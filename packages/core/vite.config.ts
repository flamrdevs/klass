import { defineConfig } from "vitest/config";

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
      entry: ["src/utils.ts", "src/index.ts", "src/setup.ts", "src/group/index.ts", "src/slots/index.ts"],
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["clsx"],
      output: {
        exports: "named",
        preserveModules: true,
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
    watch: false,
    reporters: ["default", "html"],
    outputFile: "test-reports/index.html",
  },
});
