import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { dts, build } from "../vite-config";

export default defineConfig({
  plugins: [react(), dts(["src/**/*.{ts,tsx}"])],
  build: build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"]),
});
