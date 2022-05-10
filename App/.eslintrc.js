module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'react-app'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    camelcase: 'off',
    'additional-rule': 'off',
    'promise/always-return': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'promise/catch-or-return': 'off'
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'additional-typescript-only-rule': 'warn'
      }
    }
  ]
}
