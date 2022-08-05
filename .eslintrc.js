module.exports = {
  root: true,
  plugins: ['import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': ['off'],

    'no-useless-concat': ['error'],
    'spaced-comment': ['error', 'always'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'comma-dangle': ['error', 'only-multiline'],
    'operator-linebreak': ['error', 'after'],
    'multiline-ternary': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'object-curly-newline': ['error'],
    'block-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': ['error'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1 }],

    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        MemberExpression: 'off',
        flatTernaryExpressions: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'eol-last': ['error', 'always'],

    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [{ pattern: '@/**', group: 'internal' }],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
