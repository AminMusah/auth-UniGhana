/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{

      green:'#227C70',
    blue:'#1C315E'}
    },
    screens:{
      sm: "600px",
      md: "768px",
      lg: "1060px",
      xl: "1700px",
    }
  },
  plugins: [],
}
