module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        semi: ['error', 'never'],
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true,
            },
        },
    ],
}
