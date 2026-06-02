/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 120,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/globals.css",
  tailwindFunctions: ["cn", "clsx", "cva", "cx", "twMerge"],
}

export default config
