import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Unocss(), preact()],
});
