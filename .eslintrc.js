const prettierConfig = require('./.prettierrc.js');
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'testing-library',
        'react-hooks',
        'prettier',
        'eslint-plugin-cypress',
    ],
    rules: {
        // Possible errors
        'no-console': 'warn',
        // Best practices
        'dot-notation': 'error',
        'no-else-return': 'error',
        'no-floating-decimal': 'error',
        'no-sequences': 'error',
        // Stylistic
        'array-bracket-spacing': 'error',
        'computed-property-spacing': ['error', 'never'],
        curly: 'error',
        'max-len': [
            'error',
            {
                comments: 120,
                code: 80,
                ignorePattern: '^import\\W.*',
                ignoreTrailingComments: true,
            },
        ],
        'no-lonely-if': 'error',
        // 'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'one-var-declaration-per-line': 'error',
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: false,
                avoidEscape: true,
            },
        ],
        'sort-keys': [
            'error',
            'asc',
            {
                caseSensitive: false,
            },
        ],
        // ES6
        'array-callback-return': 'off',
        'prefer-const': 'error',
        // Imports
        'import/prefer-default-export': 'off',
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            },
        ],
        'no-unused-expressions': 'off',
        // Using a lot of hasOwnProperty
        'no-prototype-builtins': 'off',
        // REACT
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/href-no-hash': [0],
        'react/display-name': 0,
        'react/no-deprecated': 'error',
        'react/no-unsafe': [
            'error',
            {
                checkAliases: true,
            },
        ],

        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 0,
        // Prettier
        // eslint looks for the prettier config at the top level of the package/app
        // but the config lives in the `config/` directory. Passing the config here
        // to get around this.
        'prettier/prettier': ['error', prettierConfig],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: [
                '**/__tests__/**/*.[jt]s?(x)',
                '**/?(*.)+(spec|test).[jt]s?(x)',
            ],
            extends: ['plugin:testing-library/react'],
        },
    ],
};
