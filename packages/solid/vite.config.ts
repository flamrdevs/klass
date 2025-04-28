import { defineConfig } from "vite";

import solid from "vite-plugin-solid";

import { build, dts } from "../config";

export default defineConfig({
	plugins: [solid(), dts(["src/**/*.{ts,tsx}"])],
	build: build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"]),
});
