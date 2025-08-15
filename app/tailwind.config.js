/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: '#31FF76',
        black: '#1C1C1E',
        white: '#fff',
        gray: '#313131'
      }
    },
  },
  plugins: [],
};