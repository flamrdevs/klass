import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

import { build, dts } from "../config";

export default defineConfig({
	plugins: [preact(), dts(["src/**/*.{ts,tsx}"])],
	build: build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"]),
});
