/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // text and background colours defined in src/index.css; they follow the system colour scheme
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        raised: "rgb(var(--color-raised) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        strong: "rgb(var(--color-strong) / <alpha-value>)",
      },
      textShadow: {
        glow: "0 0 5px #dcd2cd",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-glow": {
          textShadow:
            "0 0 5px #dcd2cd",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
