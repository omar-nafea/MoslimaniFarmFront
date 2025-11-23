/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#4CAF50',
        },
        'brand-orange': {
          DEFAULT: '#F57C00',
          light: '#FF9800',
        },
        'brand-red': '#D32F2F',
        'brand-yellow': '#FBC02D',
        'brand-bg': '#FFFDF5',
        'brand-surface': {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F0',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'card': '0 8px 24px rgba(149, 157, 165, 0.1)',
      },
    },
  },
  plugins: [],
}
