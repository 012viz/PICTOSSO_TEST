import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Gilroy"', 'sans-serif']
      },
      colors: {
        'accent': '#262449',
        'menuBorder': '#373557',
      },
      minWidth: {
        '14': '3.5rem',
      },
      backgroundImage: {
        'pictosso-radial': 'radial-gradient(circle at 90% 20%, rgba(77, 78, 150, 1) 0%, rgba(55, 49, 97, 1) 50%, rgba(5, 4, 10, 1) 90%)',
        'gradient-purple': 'linear-gradient(90deg, #D500FF -51.87%, #8000FF 100%)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
