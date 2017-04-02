import provide from './build/config/provide'

module.exports = {
  root: true,

  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true,
      allowImportExportEverywhere: false
    }
  },

  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true
  },

  globals: Object.assign({
    pageConfig: true,
    __DEV__: true,
    __PROD__: true,
  }, provide),

  // extends: ['eslint:recommended', 'plugin:react/recommended'],
  // plugins: ['react'],
  extends: 'airbnb',

  // add your custom rules here
  rules: {
    'no-console': 0,
    // 'indent': [2, 2, { SwitchCase: 1 }],
    // 'camelcase': [2, { properties: 'never' }],
    // 'prefer-const': 0,
    // 'eqeqeq': 0,
    // 'comma-dangle': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  }
}
