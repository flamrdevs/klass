import { defineConfig } from "windicss/helpers";

const combine = (s, e) => s.map((_s) => e.map((_e) => `${_s}-${_e}`)).flat(1);
const createReklassSafeList = (bps) => (cns) => [cns, ...bps.map((bp) => cns.map((cn) => `${bp}:${cn}`))].flat(1);

export default defineConfig({
  darkMode: "class",
  safelist: [
    ...createReklassSafeList(["sm", "md", "lg", "xl", "2xl"])(
      combine(["m", "mt", "mb", "ml", "mr", "mx", "my", "p", "pt", "pb", "pl", "pr", "px", "py"], ["0", "4", "8", "12", "16", "20"])
    ),
  ],
});
