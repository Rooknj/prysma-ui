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
    // Project Specific Plugins
    "react",
    "jsx-a11y",
  ],
  rules: {
    // Shared Rules
    "no-console": "warn",
    "no-unused-vars": "warn",
    // Project Specific Rules
  },
};
