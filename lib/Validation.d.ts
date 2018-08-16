import { PropertyValidatorPair } from "./Types";
import { Response } from "express";
declare function validateAllConditions(propertyValidatorPairs: PropertyValidatorPair[], req: any, res: Response): {
    isValid: boolean;
    validated?: any;
};
export { validateAllConditions };
