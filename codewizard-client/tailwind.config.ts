import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-light-gray": "#F2F2F2",
        "custom-gray": "#848484",
        "custom-blue-unkown": "#00B2BD",
        "custom-site-color": "#FFAE00",
        "custom-red": "#F02D00",
        "custom-black": "#161616",
      },
      colors: {
        "custom-light-gray": "#F2F2F2",
        "custom-gray": "#848484",
        "custom-blue-unkown": "#00B2BD",
        "custom-site-color": "#FFAE00",
        "custom-red": "#F02D00",
        "custom-black": "#161616",
      },
      width: {
        "160": "560px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
