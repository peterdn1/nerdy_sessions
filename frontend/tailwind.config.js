/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'news': '#ff5a5f',
        'life': '#2ecc71', 
        'agents': '#9b59b6',
        'tools': '#f39c12',
        'workflows': '#1abc9c',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}