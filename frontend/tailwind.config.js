module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
