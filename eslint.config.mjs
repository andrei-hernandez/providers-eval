import eslintPluginAstro from "eslint-plugin-astro";

const eslintConfig = [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  {
    ignores: ["node_modules", ".astro"],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      "astro/no-set-html-directive": "error",
    },
  },
];

export default eslintConfig;
