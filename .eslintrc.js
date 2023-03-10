module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  plugins: ["react"],
  globals: {
    L: true,
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
