module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },

      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: [2, "double"],
    "linebreak-style": 0,
    "no-underscore-dangle": "off",
    camelcase: "off",
    "class-methods-use-this": "off",
  },
};
