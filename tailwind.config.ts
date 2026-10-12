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
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
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
        sans: ["var(--font-poppins)"],
        serif: ["var(--font-kaisei)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
