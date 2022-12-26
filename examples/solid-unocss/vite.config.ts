import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [Unocss(), solid()],
});
