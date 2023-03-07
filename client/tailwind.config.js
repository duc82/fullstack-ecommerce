// const defaultTheme = require("tailwindcss/defaultTheme");
const lineClampPlugin = require("@tailwindcss/line-clamp");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        open_sans: ["Opens Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        timesNewRoman: ["Times New Roman", "serif"],
        arial: ["Arial Regular", "Arial"],
      },

      screens: {
        xs: "400px",
        lg: "992px",
        xl: "1200px",
      },

      fontSize: {
        sm: ["14px", "1.42857143"],
      },

      backgroundImage: {
        hot: "url('./assets/hot.png')",
        new: "url('./assets/new.png')",
        rhombus: "url('./assets/rhombus.webp')",
        breadcrumb: "url('./assets/breadcrumb.webp')",
        fancybox: "url('./assets/fancybox_sprite.png')",
      },

      maxWidth: {
        "3xl": "750px",
        "5xl": "970px",
        "6xl": "1200px",
      },

      gridTemplateColumns: {
        slide2: "74.7% auto",
      },

      transitionTimingFunction: {
        ease: "ease",
      },

      boxShadow: {
        card: "rgba(0,0,0,0.2) 0 0 5px",
      },

      animation: {
        growUp: "growUp 1.5s ease infinite",
      },

      keyframes: {
        growUp: {
          "0%": { transform: "scale(1)" },
          "15%": {
            "box-shadow": "0 0 0 3px rgb(185 28 28 / 15%)",
          },
          "25%": {
            "box-shadow":
              "0 0 0 3px rgb(185 28 28 / 15%),0 0 0 5px rgb(185 28 28 / 15%)",
          },
          "30%": {
            transform: "scale(1.2)",
          },
          "50%": {
            "box-shadow":
              "0 0 0 7px rgb(185 28 28 / 15%),0 0 0 7px rgb(185 28 28 / 15%),0 0 0 10px rgb(185 28 28 / 15%)",
          },
          "80%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [lineClampPlugin],
};
