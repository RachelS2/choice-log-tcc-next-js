import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        brown: "var(--brown)",
        darkBlue: "var(--darkBlue)",
        darkdarkBlue: "var(--darkdarkBlue)",
        lightdarkBlue: "var(--lightdarkBlue)",
        lightBrown: "var(--lightBrown)",
        beige: "var(--beige)",
        mediumBeige: "var(--mediumBeige)",
        offWhite: "var(--offWhite)",
      },
      fontFamily: {
        kaisei: ['"Kaisei Tokumin"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
