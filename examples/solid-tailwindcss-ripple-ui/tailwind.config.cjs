const combine = (s, e) => s.map((_s) => e.map((_e) => `${_s}-${_e}`)).flat(1);
const createReklassSafeList = (bps) => (cns) => [cns, ...bps.map((bp) => cns.map((cn) => `${bp}:${cn}`))].flat(1);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "data-mode='dark'"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    ...createReklassSafeList(["sm", "md", "lg", "xl", "2xl"])(
      combine(["m", "mt", "mb", "ml", "mr", "mx", "my", "p", "pt", "pb", "pl", "pr", "px", "py"], ["0", "4", "8", "12", "16", "20"])
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
};
