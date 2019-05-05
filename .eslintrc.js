const path = require('path');

module.exports = {
  globals: {
    fetch: true,
    sessionStorage: true,
    localStorage: true,
    Promise: true,
    document: true,
    require: true,
    Intl: true,
    Map: true,
    module: true,
    process: true,
    console: true,
    window: true,
    FormData: true,
    FileReader: true,
    Image: true,
    URL: true
  },

  parser: '@typescript-eslint/parser',
  extends: [
    // "plugin:import/errors", // See https://github.com/benmosher/eslint-plugin-import
    // "plugin:import/warnings",
    "plugin:react/recommended", // See https://github.com/yannickcr/eslint-plugin-react
    "prettier", // See https://github.com/prettier/eslint-plugin-prettier
    "prettier/react",

    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    //'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],

  plugins: ["@typescript-eslint", 'react', 'prettier', 'import'],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },

  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '.')]
      }
    }
  },
  
  rules: {
    // typescript
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // general
    'no-console': 'warn',
    'no-dupe-keys': 'warn',
    'object-shorthand': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'off',
    'no-use-before-define': 'warn',

    // import
    'import/order': [
      'error',
      {
        'newlines-between': 'always'
      }
    ],
    "import/no-default-export": "error",
    'import/newline-after-import': 'warn',
    // 'import/no-named-as-default': 'off',
    // 'import/no-unresolved-import': 'off',

    // react
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/boolean-prop-naming': 'warn',
    'react/default-props-match-prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'warn',
    'react/display-name': 'off',
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-children-prop": 'off',

    // prettier
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true,
        semi: false,
        arrowParens: 'always',
        tabWidth: 2
      }
    ]
  }
};
