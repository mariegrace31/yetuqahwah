/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yq_main: "#371F13",
        yq_choc: "#5A3813",
        yq_lightchoc: "#BA9D75",
        yq_beige: "#FDEFE2",
        yq_white1: "#FEFAF5",
        yq_white2: "#FFFFFF",
        yq_orange: "#FFAE4D",
        yq_lightbeige: "#FEF7F1",
        yq_black: "#1E1E1E",
        yq_blue: "#0053FA",
        yq_bg: "#EDE7E4"
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
