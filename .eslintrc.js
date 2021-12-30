module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      // customizing prettier rules (not many of them are customizable)
      'error',
      {
        singleQuote: true,
        printWidth: 160,
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'max-len': 'off',
    'no-return-assign': 'off', // common in three.js
    'no-param-reassign': 'off', // three standard syntax has many re-assigns
  },
};
