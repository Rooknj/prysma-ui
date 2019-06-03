module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // Shared Configs
    "eslint:recommended",
    // Project Specific Configs
    "react-app",
    "airbnb",
    // Make sure this is last
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    // Shared Plugins
    "import",
    "prettier",
    // Project Specific Plugins
    "react",
    "jsx-a11y",
  ],
  rules: {
    // Shared Rules
    "no-console": "warn",
    "no-unused-vars": "warn",
    quotes: "off", // prettier
    "comma-dangle": "off", // prettier
    "arrow-parens": "off", // prettier
    "object-curly-newline": "off",
    "prefer-destructuring": "warn",
    "operator-linebreak": "off", // prettier
    "implicit-arrow-linebreak": "off", // prettier
    "max-len": "off", // prettier
    "no-trailing-spaces": "off", // prettier
    semi: "off", // prettier
    "eol-last": "off", // prettier
    radix: "off",
    "no-underscore-dangle": "off",
    "object-curly-spacing": "off", // prettier
    // Project Specific Rules
    "import/no-unresolved": "off",
    "react/jsx-wrap-multilines": "off", // prettier
    "react/jsx-indent": "off", //prettier
    "react/destructuring-assignment": "warn",
    "prettier/prettier": "warn",
  },
};
