/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      colors: {
        "custom-color": "#123456",
        color1: "rgb(255.0.0)",
        color2: "#A26767",
        color3: "#2E6D8A",
      },
    },
  },
};
