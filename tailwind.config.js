/** @type {import('tailwindcss').Config} */
import animations from 'tailwindcss-animations';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    animations,
  ],
}
