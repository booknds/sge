module.exports = {
    "rules": {
        "indent": [
            2,
            4
        ],
        "quotes": [
            2,
            "double"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ],
        "no-undef": 1,
        "no-redeclare": 1,
        "no-debugger":1,
        "valid-jsdoc":0,
        "no-use-before-define": [2, {"functions": false}],
        "no-extra-bind": 1,
        "no-invalid-this": 1,
        "consistent-return": 1,
        "no-console": [2, { allow: ["warn"] }],
        "no-unused-expressions": 1,
        "no-trailing-spaces": 0
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "globals": {
        "Materialize": true,
        "describe": true,
        "it": true,
        "expect": true,
        "angular": true,
        "require": true,
        "before": true,
        "beforeEach": true,
        "after": true,
        "afterEach": true
    }
};
