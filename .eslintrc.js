var angular = require('eslint-plugin-angular');

//console.log(angular);

module.exports = {
    "rules": {
        "indent": [
            2,
            4
        ],
        // "no-console":[2, {"allow": ["log"] }],
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

        "angular/angularelement": 1,
        "angular/controller-as": 2,
        "angular/controller-as-route": 2,
        "angular/controller-as-vm": [2, "vm"],
        "angular/controller-name": [2, "/[A-Z].*Controller$/"],
        "angular/deferred": 0,
        "angular/definedundefined": 2,
        "angular/di": [2, "function"],
        "angular/di-order": [0, true],
        "angular/directive-name": 0,
        "angular/directive-restrict": [0, {"restrict": "AE", "explicit": "never"}],
        "angular/component-limit": [0, 1],
        "angular/document-service": 2,
        "angular/empty-controller": 0,
        "angular/file-name": 0,
        "angular/filter-name": 0,
        "angular/foreach": 0,
        "angular/function-type": 0,
        "angular/interval-service": 2,
        "angular/json-functions": 2,
        "angular/log": 2,
        "angular/module-dependency-order": [0, {"grouped": true, "prefix": null}],
        "angular/module-getter": 2,
        "angular/module-name": 0,
        "angular/module-setter": 1,
        "angular/no-angular-mock": 0,
        "angular/no-controller": 0,
        "angular/no-cookiestore": 2,
        "angular/no-digest": 2,
        "angular/no-http-callback": 2,
        "angular/no-inline-template": [0, {"allowSimple": true}],
        "angular/no-jquery-angularelement": 2,
        "angular/no-private-call": 2,
        "angular/no-run-logic": [0, {"allowParams": true}],
        "angular/no-service-method": 2,
        "angular/no-services": [2, ["$http", "$resource", "Restangular"]],
        "angular/on-watch": 2,
        "angular/one-dependency-per-line": 0,
        "angular/rest-service": 0,
        "angular/service-name": 2,
        "angular/timeout-service": 2,
        "angular/typecheck-array": 2,
        "angular/typecheck-date": 2,
        "angular/typecheck-function": 2,
        "angular/typecheck-number": 2,
        "angular/typecheck-object": 2,
        "angular/typecheck-regexp": 2,
        "angular/typecheck-string": 2,
        "angular/watchers-execution": [0, "$digest"],
        "angular/window-service": 2
    
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    //"extends": "angular",
    "plugins":[
        "angular"
    ],
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    }
};