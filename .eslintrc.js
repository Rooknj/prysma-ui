module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // Shared Configs
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    // Project Specific Configs
    "react-app",
    "airbnb",
    // Make sure this is last
    "prettier",
    "prettier/react"
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
    "prefer-destructuring": "warn",
    radix: "off",
    "no-underscore-dangle": "off",
    "prettier/prettier": "error",
    // Project Specific Rules
    "import/no-unresolved": "off",
    "react/destructuring-assignment": "warn",
  },
};
