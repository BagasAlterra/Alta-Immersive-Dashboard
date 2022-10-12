/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "alta-space-cadet": "#152C59",
        "alta-orange": "#EF6236",
        "alta-background": "#F4F7FC",
      },
      fontFamily: {
        "rotunda-regular": ["rotunda-regular", "rotunda"],
        "rotunda-medium": ["rotunda-medium", "rotunda"],
        "rotunda-bold": ["rotunda-bold", "rotunda"],
      },
    },
  },
  plugins: [require("daisyui")],
};
