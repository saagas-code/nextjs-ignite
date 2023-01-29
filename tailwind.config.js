/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        bgGray: '#171923',
        900: '#181B23',
        800: '#1F2829',
        700: '#353646',
        600: '#4B4D63',
        500: '#616480',
        400: '#797D9A',
        300: '#9699B0',
        200: '#797D9A',
        100: '#D1D2DC',
        50: '#EEEEF2',
      },
      screens: {
        'mlg': {'max': '1024px'},
        'mmd': {'max': '768px'}
      }
    }
  },
  plugins: [],
}
