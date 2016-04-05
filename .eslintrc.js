module.exports = {
    "rules": {
        "no-debugger":1,
        "no-console": [2, { allow: ["warn"] }],
        "no-extra-parens": 1,
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "airbnb",
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
