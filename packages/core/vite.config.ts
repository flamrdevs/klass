import { defineConfig } from "vite";

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
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [],
});
