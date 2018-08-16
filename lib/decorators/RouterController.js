"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../Controller");
function RouterController(route) {
    return function (construct) {
        var _a;
        if (!(construct.prototype instanceof Controller_1.Controller)) {
            throw `Class ${construct.name} instance of Controller`;
        }
        return _a = class extends construct {
            },
            _a._className = construct.name,
            _a._route = route,
            _a;
    };
}
exports.RouterController = RouterController;
