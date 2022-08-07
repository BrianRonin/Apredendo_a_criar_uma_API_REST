module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    quotes: ["error", "double", 0, "avoid-escape"],
    "class-methods-use-this": "off",
    // semi: ["error", "al"],
    semi: 0,
  },
};
