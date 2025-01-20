/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "Padauk", "serif"],
      titel: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        scrollbar: {
          track: "#1f2937", // Dark gray
          thumb: "#4b5563", // Gray
          width: "2px",
        },
      },
    },
  },
  darkMode: "class",
};
