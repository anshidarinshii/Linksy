/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7E22CE", // Purple
        secondary: "#A855F7", // Lighter purple
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};