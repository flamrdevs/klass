import { defineConfig } from "vite";

import solid from "vite-plugin-solid";

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
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@klass/core", "solid-js", "solid-js/web"],
    },
  },
  plugins: [solid() as any],
});
