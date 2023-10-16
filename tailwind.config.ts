import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Primary Color
      primary: "#FF5A5F",
      "primary-hover": "#E43C44",

      // Secondary Colors
      "accent-green": "#2ecc71",
      "accent-red": "#e74c3c",
      "accent-orange": "#f39c12",

      // Neutral Colors

      gray: "#24292E",
      "gray-light": "#ECECEC",
      "gray-medium": "#D3D3D3",
      "gray-dark": "#333333",
      "border-color": "#bdc3c7",

      // Action Colors
      "button-color": "#3498db",
      "button-hover": "#2980b9",

      // Error/Alert Colors
      white: "#FFFFFF",
      black: "#000000",
      success: "#2ecc71",
      error: "#e74c3c",
      transparent: "transparent",
    },
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      body: ["Lora", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
