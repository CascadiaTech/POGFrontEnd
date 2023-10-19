/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "450px",
      md: "650px",
      mdxl: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    backgroundColor: (theme) => ({
      primary: "#000000",
      secondary: "#ffed4a",
      danger: "#e3342f",
      ...theme("colors"),
    }),
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "2.5rem",
      "4xl": "3.441rem",
      "5xl": "5rem",
    },

    extend: {
      backgroundImage: {
        runewaterfall: "url('../assets/images/Falls.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
      spacing: {
        100: "50vw",
      },
      fontFamily: {
        serif: ["Cinzel", "serif"],
      },
      margin: {
        "100vw": "100vw",
        "1000px": "1000px",
      },
      clipPath: {
        mypolygon: "polygon(0 0, 100% 0, 0% 100%, 0 calc(100% - 6vw))",
        myoppositepolygon:
          "polygon(100% 0, 100% 0, 100% 100%, 0 calc(100% - 0vw))",
        clipsides:
          "polygon(calc(60% - 10vw) 0, 100% 0, 100% 100%, 22% calc(100% - 0vw))",
        mycorners:
          "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)",
      },
      height: {
        1000: "1000px",
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: "fadeIn 3s ease-in forwards",
        halfFadeIn: "halfFadeIn 3s ease-in forwards",
        fadeOut: "fadeIn 2s ease-in forwards",
        fadeindown: "fadeindown 1s ease-out forwards",
        fadeInUp: "fadeInUp 2s ease-in-out forwards",
        fadeinleft: "fadeinleft 2s ease-in-out forwards",
        fadeinright: "fadeinright 1s ease-out forwards",
        scaleintopleft: "scaleintopleft 1.5s ease-in-out forwards",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        halfFadeIn: {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeindown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-200px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(200px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        fadeinleft: {
          "0%": {
            opacity: 0.20,
            transform: "translateX(-300px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        fadeinright: {
          "0%": {
            opacity: 0,
            transform: "translateX(100px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        scaleintopleft: {
          "0%": {
            transform: "scale(0.3)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [
    require("tailwindcss-elevation")(["responsive"]),
    require("tw-elements/dist/plugin"),
    require("flowbite/plugin"),
    require("tailwind-clip-path"),
  ],
};
