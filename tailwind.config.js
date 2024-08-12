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
      backgroundImage: {
        "location-button": "url('/images/location-button.jpg')",
        "event-button":
          "url('https://plus.unsplash.com/premium_photo-1681830819887-dfd9325626ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
