import defaultTheme from "tailwindcss/defaultTheme"
import animations from "@midudev/tailwind-animations"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        header: "var(--color-header)",
      },
      fontFamily: {
        sans: [
          "DM Mono",
          "Inter var",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    animations,
    function ({ addVariant }) {
      addVariant("any-hover", "@media (any-hover: hover) { &:hover }")
    },
  ],
}
