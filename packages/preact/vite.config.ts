import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

declare global {
  namespace NodeJS {
    interface CustomEnv {
      UNMINIFY: string;
    }
    interface ProcessEnv extends CustomEnv {}
  }
}

const env = { true: (key: keyof NodeJS.CustomEnv) => process.env[key] === "true" };

export default defineConfig({
  build: {
    ...(env.true("UNMINIFY") ? { minify: false } : {}),
    target: "esnext",
    lib: {
      name: "KlassPreact",
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "preact", "preact/hooks"],
    },
  },
  plugins: [preact() as any],
});
