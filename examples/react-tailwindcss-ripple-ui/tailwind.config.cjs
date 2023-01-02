/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "data-mode='dark'"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
};
