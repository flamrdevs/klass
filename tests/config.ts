import fs from "node:fs";
import path from "node:path";

import type { ViteUserConfig } from "vitest/config";

import paths from "vite-tsconfig-paths";

export const custom = (__dirname: string) => {
	const { name } = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")) as {
		name: string;
	};

	return {
		define: {},
		plugins: [paths()],
		test: {
			name,
			environment: "jsdom",
		},
	} satisfies ViteUserConfig;
};
