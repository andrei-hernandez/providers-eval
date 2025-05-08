import eslintPluginAstro from "eslint-plugin-astro";

const eslintConfig = [
  {
    ignores: ["node_modules", ".astro"],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.astro", "*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    processor: "astro/client-side-ts", // Uses the "client-side-ts" processor.
    rules: {
      "astro/no-set-html-directive": "error",
      semi: ["error", "never"],
    },
  },
];

export default eslintConfig;
