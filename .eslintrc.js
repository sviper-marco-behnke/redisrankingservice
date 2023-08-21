module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: [],
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "max-len": ["warn", { code: 180 }],
    // throws too many false positives https://github.com/eslint/eslint/issues/11899
    "require-atomic-updates": "off",
    "comma-dangle": ["error", "never"],
    "prefer-const": ["error", { destructuring: "all" }],
    "no-var": "error",
    "arrow-parens": ["error", "as-needed"],
    "eqeqeq": ["warn", "always"],
    "no-console": "error",
    "keyword-spacing": ["error", { before: true, after: true }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "semi-spacing": ["error", { before: false, after: true }],
    "comma-spacing": ["error", { before: false, after: true }],
    "switch-colon-spacing": ["error", { before: false, after: true }],
    "block-spacing": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "never"],
    "rest-spread-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "mocha/no-hooks-for-single-case": "off",
    "mocha/no-pending-tests": "warn",
    "mocha/no-exclusive-tests": "error",
    "mocha/no-skipped-tests": "error"
  }
};
