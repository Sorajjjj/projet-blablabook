import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blabla': {
          'dark': '#293B47',
          'teal': '#2D6A6D',
          'light-blue': '#A6C4C7',
          'orange': '#E67141',
          'taupe': '#978B7B',
          'cream': '#F2F1E8',
          'light-cream': '#FDFBF7',
        },
      },
      boxShadow: {
        'inner-custom': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'sans': ['Basic', 'sans-serif'],
        'basic': ['Basic', 'sans-serif'],
        'bayon': ['Bayon', 'sans-serif'],
      },
    },
  },
  plugins: [
    lineClamp,
  ],
};
export default config;
