module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'no-empty': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreRegExpLiterals': true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': ['error', 'never', { 'json': 'always' }],
    'import/order': [
      'error',
      {
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
        'newlines-between': 'always-and-inside-groups',
        'groups': [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ]
      }
    ],
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};