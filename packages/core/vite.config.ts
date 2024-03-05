import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

import $env from "./env";

const env = $env();

export default defineConfig({
  build: {
    ...(env.unminify ? { minify: false } : {}),
    target: "esnext",
    lib: {
      entry: ["src/utils.ts", "src/index.ts", "src/setup.ts", "src/group/index.ts", "src/group/setup.ts", "src/slots/index.ts", "src/slots/setup.ts"],
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
    dts({
      include: ["src/**/*.ts"],
      compilerOptions: {
        removeComments: false,
      },
      staticImport: true,
    }),
  ],
});
