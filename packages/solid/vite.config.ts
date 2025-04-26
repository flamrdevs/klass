import { defineConfig } from "vite";

import solid from "vite-plugin-solid";

import { dts, build } from "../vite-config";

export default defineConfig({
  plugins: [solid(), dts(["src/**/*.{ts,tsx}"])],
  build: build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"]),
});
