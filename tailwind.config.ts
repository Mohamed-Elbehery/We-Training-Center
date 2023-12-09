import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        "primary": "#5d3091",
      }
    },
  },
  darkMode: ['class', '[data-mode="light"]'],
  plugins: [require("daisyui")],
}
export default config
