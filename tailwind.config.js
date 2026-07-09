/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ہم class نہیں استعمال کر رہے، لیکن رکھنے میں کوئی حرج نہیں
  theme: {
    extend: {
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        unit: "4px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        "2xl": "80px",
        gutter: "24px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "max-width": "1280px",
      },
      fontFamily: {
        "headline-xl": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "display-lg": ["Geist", "sans-serif"],
        "display-lg-mobile": ["Geist", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-sm": ["Geist", "sans-serif"],
        mono: ["Geist", "monospace"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-sm": ["13px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" }],
        mono: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      animation: {
        "text-shine": "shine 5s linear infinite",
        "shimmer": "shimmer 4s infinite linear",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "to": { backgroundPosition: "200% center" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};