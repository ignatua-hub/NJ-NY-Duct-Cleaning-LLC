import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          alt: "#0A0F1A",
          card: "#0F1624",
          blue: "#1E90FF",
          deep: "#0A5BFF",
          cyan: "#29B6FF",
          muted: "#A8B3C7",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(30,144,255,0.25)",
      },
      backgroundImage: {
        // Used behind white text, so it is darkened from the #29B6FF→#0A5BFF brand gradient to keep 4.5:1 contrast.
        "blue-gradient": "linear-gradient(135deg, #1570D6 0%, #0A4BD6 100%)",
        "silver-gradient": "linear-gradient(180deg, #FFFFFF 0%, #B8C0CC 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
