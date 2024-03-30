module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#101828",
      gray: "#F0F4FF",
      "dark-gray": "#767676",
      "gray-dropdown": "#F0F0F0",
      "light-blue": "#91A9FF",
      blue: "#325EFF",
      green: "#7FC008",
      red: "#DB303F",
      yellow: "#DB8C28",
    },
  },
  daisyui: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
