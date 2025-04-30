import { defineConfig } from "vite";

import jsx from "@vitejs/plugin-vue-jsx";

import { build, dts } from "../config";

export default defineConfig({
	plugins: [jsx(), dts(["src/**/*.{ts,tsx}"])],
	build: build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"]),
});
