import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [WindiCSS(), solid()],
});
