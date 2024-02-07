/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "amber-overlay": "rgba(255, 253, 247, 1)", // Amber-50에 흰색 투명도 60%를 적용한 색상
        "amber-cloudy": "rgba(203, 194, 159, 1)", // Amber-100에 검은색 투명도 20%를 적용한 색상
      },
      width: {
        "auto-important": "auto!important",
      },
    },
    fontSize: {
      title: [
        "1.875rem",
        {
          lineHeight: "2.25rem",
          fontWeight: "700",
        },
      ],
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
      "5xl": ["3rem", "1"],
      "6xl": ["3.75rem", "1"],
      "7xl": ["4.5rem", "1"],
      "8xl": ["6rem", "1"],
      "9xl": ["8rem", "1"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
