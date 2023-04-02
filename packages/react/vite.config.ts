import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

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
      external: ["@klass/core", "react", "react-dom"],
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }) as any,
  ],
});
