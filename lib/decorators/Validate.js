"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("../Validation");
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
