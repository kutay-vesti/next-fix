const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      phoneFin: "760px",
      tablet: "970px",
      // => @media (min-width: 640px) { ... }

      laptop: "1140px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1140px",
      // => @media (min-width: 1280px) { ... }
      desktopbig: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      // fontFamily: {
      //   sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      // },
      zIndex: {
        100: "100",
      },
      transitionTimingFunction: {
        menuAnim: "transform 400ms cubic-bezier(0.65, 0.05, 0.36, 1) 1.13091ms",
      },
      width: {
        480: "480px",
        350: "350px",
        360: "360px",
      },

      height: {
        720: "720px",
      },
    },
  },
  plugins: [],
};
