module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  "parserOptions": {
    "ecmaVersion": 2017
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'vue/valid-v-if': 'error',
    'no-console': 'off',
    'no-ternary': 0,
    'no-nested-ternary': 0,
    'multiline-ternary': 0
  }
};
