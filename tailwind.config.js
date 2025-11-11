/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // transform: [

    // ]
  },

  darkMode: "media",

  theme: {
    fontFamily: {
      sans: ["Skyling", "sans-serif"],
      serif: ["Awesome Serif", "serif"],
      mono: ["Space Mono", "monospace"],
    },
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "900px",
      xl: "1288px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    extend: {
      letterSpacing: {
        "02": "0.024em",
        "01": "0.01em",
      },
      borderRadius: {
        "5px": ".3125rem",
        "16px": "1rem",
      },
      fontSize: {
        "small": ".75rem", //12px
        "base": "1rem", //16px
        "large": "1.25rem", //20px
        "xlarge": "1.5625rem", //25px
        "30px": "1.875rem", //30px
        "2xlarge": "2rem", //32px
        "3xlarge": "2.5rem", //40px
        "4xlarge": "3.75rem", //60px
      },
      lineHeight: {
        100: "100%",
        120: "120%",
      },
      transitionTimingFunction: {
        springy: "var(--ease-springy)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",

        // code colors
        code: {
          foreground: "var(--code-foreground)",
          background: "var(--code-background)",
          accent: "var(--code-accent)",
          DEFAULT: "var(--code-accent)", // Optional: makes 'bg-accent' work
        },
        // Accent colors
        accent: {
          1: "var(--accent-1)",
          2: "var(--accent-2)",
          3: "var(--accent-3)",
          DEFAULT: "var(--accent-1)", // Optional: makes 'bg-accent' work
        },

        // Contrast colors
        contrast: {
          1: "var(--contrast-1)",
          2: "var(--contrast-2)",
          3: "var(--contrast-3)",
        },

        gray: {
          "ED": "#EDEDED",
          "3c": "#3C3E41",
          "5a": "#5a5a55",
          "87": "#878787",
          "d9": "#d9d9d9",
          "f5": "#f5f5f5",
        },

        white: "#FFFFFF",
        "off-white": "var(--off-white)",
      },
    },
  },
  plugins: [],
};
