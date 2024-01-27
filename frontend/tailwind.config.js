/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amber-overlay': 'rgba(255, 253, 247, 1)', // Amber-50에 흰색 투명도 60%를 적용한 색상
      }
    },
  },
  plugins: [],
}