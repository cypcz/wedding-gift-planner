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
      fontFamily: {
        corsiva: ["Corsiva"],
      },
      colors: {
        bg: "#FAF6F1",
        secondary: "#D6BD7F",
        input: "#373232",
        error: "#E15F5F",
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
        12: "12px",
      },
      minWidth: {
        '1/5': '20%'
      },
      keyframes: {
        dotLoading: {
          "0%": {
            backgroundColor: "#373232"
          },
          "50%, 100%": {
            backgroundColor: "#D6BD7F"
          }
        },
      },
      animation: {
        dotLoading1: 'dotLoading 1s 0.1s infinite alternate',
        dotLoading2: 'dotLoading 1s 0.6s infinite alternate',
        dotLoading3: 'dotLoading 1s 1.1s infinite alternate',
      },
    },
  },
  variants: {},
  plugins: [],
};
