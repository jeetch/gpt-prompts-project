/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {
    extend: {
        colors: {
          sky: {
            600: '#345f8a',
            700: '#264564',
            800: '#21374a',
            900: '#182b3c',
          950: '#122232'}}

          
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
