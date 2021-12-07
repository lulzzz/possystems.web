module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    es6: true,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
  },
  ignorePatterns: ['public/**'],
  settings: {
    react: {
      version: '17.0.0',
    },
  },
};
