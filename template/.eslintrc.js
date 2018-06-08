module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'airbnb',
        'plugin:vue/recommended',
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'indent': 'off',
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {"baseIndent": 1}],
    },
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [".js",".vue"]
            }
        }
    },
};
