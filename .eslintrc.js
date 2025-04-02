module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    // ignorePatterns: ['/src/amchome/**'],
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': ['off', { endOfLine: 'auto' }],
      'react/jsx-filename-extension': 'off',
      'react/no-array-index-key': 0,
      'no-console': 2,
      'prefer-arrow-callback': 1,
      'react/forbid-prop-types': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'react/jsx-props-no-spreading': 0,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelComponents: ['CustomInputLabel'],
          labelAttributes: ['label'],
          controlComponents: ['CustomInput'],
          depth: 3,
        },
      ],
      'react/react-in-jsx-scope': 0,
      'no-underscore-dangle': 0,
      'no-nested-ternary': 0,
      // 'no-undef': 0,
      'jsx-a11y/anchor-is-valid': 0,
    },
  };
  