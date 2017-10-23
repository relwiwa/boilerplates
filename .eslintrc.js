module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'no-unused-vars': ['warn'],
    'no-console': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'valid-jsdoc': 2
  },
};
