/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      lightred: "#ffadad",
      lightorange: "#ffd6a5",
      lightyellow: "#fdffb6",
      lightgreen: "#caffbf",
      lightblue: "#9bf6ff",
      lightpurple: "#a0c4ff",
      lightlavender: "#bdb2ff",
      lightpink: "#ffc6ff",
      red: "#ff7a7a",
      orange: "#f6b47a",
      yellow: "#e0e573",
      green: "#80d1a8",
      blue: "#58c4d7",
      purple: "#7b9cf5",
      lavender: "#a08cee",
      pink: "#ff98cb",
      black: "#1c1c1c",
      darkgray: "#808080",
      lightgray: "#d3d3d3",
      white: "#ffffff",
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
