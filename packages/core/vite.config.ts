import { defineConfig } from "vite";

import { dts, build } from "../vite-config";

export default defineConfig({
  plugins: [dts(["src/**/*.ts"])],
  build: build(["utils.ts", "index.ts", "create.ts", "group/index.ts", "group/create.ts", "slots/index.ts", "slots/create.ts"]),
});
