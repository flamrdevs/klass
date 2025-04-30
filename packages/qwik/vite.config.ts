import { defineConfig } from "vite";

import { qwikVite as qwik } from "@builder.io/qwik/optimizer";

import { build, dts } from "../config";

const _build = build(["utils.ts", "index.tsx", "create.tsx", "mono/index.tsx", "mono/create.tsx"], (options) => {
	options.lib.fileName = (_, entry) => `${entry}.qwik.mjs`;
});

export default defineConfig({
	mode: "lib",
	plugins: [
		qwik(),
		{
			name: "minify",
			config: (config) => {
				config.build!.minify = _build.minify;
			},
		},
		dts(["src/**/*.{ts,tsx}"]),
	],
	build: _build,
});
