/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    // Overriding breakpoints for Ionic Framework
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
