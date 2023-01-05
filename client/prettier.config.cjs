// prettier.config.js
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParen: "always",
  printWidth: 80,
  tabWidth: 2,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.cjs",
};
