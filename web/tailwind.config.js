module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF6F1",
        secondary: "#8F8686",
      },
      inset: {
        1: "1rem",
        "50%": "50%",
      },
      scale: {
        "-1": "-1",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  variants: {},
  plugins: [],
};
