import { ValidateConditions, BodySource } from "../Types";
export declare function Validate(parameterName: string, conditions: ValidateConditions, source?: BodySource): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
