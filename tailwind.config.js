/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: {
          50: '#FCF9F5',
          100: '#F8F1E9',
          200: '#F1E3D3',
          300: '#E9D5BD',
          400: '#E2C7A7',
          500: '#DAB991',
          600: '#D2AB7B',
          700: '#C99D65',
          800: '#C18F4F',
          900: '#B98139',
        },
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'vintage': '2px 2px 4px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}