module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.md",
  ],
  theme: {
    colors: {
      // Wall
      "wall-100": "#F3F2F0", // Primary
      "wall-200": "#E3E0DB",
      "wall-300": "#C8C4BD",
      "wall-400": "#918C84",
      "wall-500": "#5A564F",
      "wall-600": "#24221E",
      washedWall: "rgba(240, 239, 236, .8)", // for overlays
      // Greens (Theme Primary Color)
      "green-100": "#E5F7F1",
      "green-200": "#BFEBDB",
      "green-300": "#80D8B8",
      "green-400": "#00B171", // Primary
      "green-500": "#006842",
      "green-600": "#001F13",
      // Yellows
      "yellow-100": "#FFFCF1",
      "yellow-200": "#FEEBAA",
      "yellow-300": "#FCDB63", // Primary
      "yellow-400": "#CE9645",
      "yellow-500": "#A15A2D",
      "yellow-600": "#602010",
      // Blues
      "blue-100": "#F1F9FF",
      "blue-200": "#BAE9FF",
      "blue-300": "#7ED8FF",
      "blue-400": "#219DFF", // Primary
      "blue-500": "#193C90",
      "blue-600": "#070821",
      // Util
      black: "#000",
      white: "#FFF",
      transparent: "rgba(0,0,0,0)",
      // Syntax highlighting
      purple: "rgba(157,82,255,0.8)",
      red: "#ff4136",
      // White semi-opaques
      washedWhite: "rgba(255,255,255, 0.5)",
      midWhite: "rgba(255,255,255, 0.8)",
    },
    fontFamily: {
      sans: ["Inter", "-apple-system", "sans-serif"],
      mono: ["Source Code Pro", "monospace"],
    },
    extend: {
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
