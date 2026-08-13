import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/emails/**/*.{js,ts,jsx,tsx,mdx}", // Добавь этот путь, если вынес папку
    // Или "./src/app/email/**/*.{js,ts,jsx,tsx,mdx}", если папка осталась там
  ],
  // ...
};
export default config;