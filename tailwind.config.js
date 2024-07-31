/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        purpal: "hsl(259, 100%, 65%)",
        lightRed: "hsl(0, 100%, 67%)",
        white: "hsl(0, 0%, 100%)",
        offWhite: "hsl(0, 0%, 94%)",
        lightGrey: "hsl(0, 0%, 86%)",
        smokeGrey: "hsl(0, 1%, 44%)",
        offBlack: "hsl(0, 0%, 8%)",
      },
      fontSize: {
        primary: "32px",
      },
      keyframes: {
        bottom: {
          '0%,100%': {transform: 'translateY(25%)'},
          '50%': {transform: 'translateY(0)'},
        }
      },
      animation: {
        bottom: 'bottom 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

