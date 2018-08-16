"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const Validation_1 = require("./Validation");
//<editor-fold desc="Controller Decorator">
function RouterController(route) {
    return function (construct) {
        if (!(construct.prototype instanceof Controller_1.Controller)) {
            throw `Class ${construct.name} instance of Controller`;
        }
        return _a = class extends construct {
            },
            _a._className = construct.name,
            _a._route = route,
            _a;
        var _a;
    };
}
exports.RouterController = RouterController;
function httpMethodDecoratorFactory(method) {
    return function (route) {
        return function (target, propertyKey, descriptor) {
            if (!(target instanceof Controller_1.Controller)) {
                throw `Class ${target.constructor.name} should extend class Controller!`;
            }
            const constructor = target.constructor;
            if (!constructor._handlers) {
                constructor._handlers = [];
            }
            constructor._handlers.push({
                route,
                method,
                handler: descriptor.value
            });
            return descriptor;
        };
    };
}
exports.Get = httpMethodDecoratorFactory("get");
exports.All = httpMethodDecoratorFactory("all");
exports.Post = httpMethodDecoratorFactory("post");
exports.Put = httpMethodDecoratorFactory("put");
exports.Delete = httpMethodDecoratorFactory("delete");
exports.Patch = httpMethodDecoratorFactory("patch");
exports.Options = httpMethodDecoratorFactory("options");
exports.Head = httpMethodDecoratorFactory("head");
exports.Checkout = httpMethodDecoratorFactory("checkout");
exports.Copy = httpMethodDecoratorFactory("copy");
exports.Lock = httpMethodDecoratorFactory("lock");
exports.Merge = httpMethodDecoratorFactory("merge");
exports.Mkactivity = httpMethodDecoratorFactory("mkactivity");
exports.Mkcol = httpMethodDecoratorFactory("mkcol");
exports.Move = httpMethodDecoratorFactory("move");
exports.Notify = httpMethodDecoratorFactory("notify");
exports.Purge = httpMethodDecoratorFactory("purge");
exports.Report = httpMethodDecoratorFactory("report");
exports.Search = httpMethodDecoratorFactory("search");
exports.Subscribe = httpMethodDecoratorFactory("subscribe");
exports.Trace = httpMethodDecoratorFactory("trace");
exports.Unlock = httpMethodDecoratorFactory("unlock");
exports.Unsubscribe = httpMethodDecoratorFactory("unsubscribe");
//</editor-fold>
//<editor-fold desc="Validate Decorators">
const descriptorValidatorsMap = new Map();
function Validate(parameterName, conditions, source) {
    return function (target, propertyKey, descriptor) {
        let descriptorValidators = descriptorValidatorsMap.get(descriptor);
        const propertyValidatorPair = { property: parameterName, source, conditions };
        if (descriptorValidators) {
            descriptorValidators.push(propertyValidatorPair);
        }
        else {
            const originalFunction = descriptor.value;
            descriptorValidators = [propertyValidatorPair];
            descriptor.value = function (req, res, next) {
                const { isValid, validated } = Validation_1.validateAllConditions(descriptorValidators, req, res);
                if (isValid) {
                    originalFunction.bind(this)(req, res, next, validated);
                }
            };
            descriptorValidatorsMap.set(descriptor, descriptorValidators);
        }
        return descriptor;
    };
}
exports.Validate = Validate;
//</editor-fold>
