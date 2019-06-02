module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "react-app"],
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
  plugins: ["react", "jsx-a11y"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};
