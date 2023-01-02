import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [WindiCSS(), preact()],
});
