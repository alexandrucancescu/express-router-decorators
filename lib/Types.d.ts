import { RequestHandler } from "express";
export declare type HttpMethod = "get" | "all" | "post" | "put" | "delete" | "patch" | "options" | "head" | "checkout" | "copy" | "lock" | "merge" | "mkactivity" | "mkcol" | "move" | "notify" | "purge" | "report" | "search" | "subscribe" | "trace" | "unlock" | "unsubscribe";
export declare type ClassDecorator = <T extends Constructor>(constructor: T) => T;
export declare type FunctionDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare type Constructor = {
    new (...args: any[]): any;
};
export declare type RouterHandler = {
    route: string;
    method: HttpMethod;
    handler: Function | RequestHandler;
};
export declare type DataType = "object" | "boolean" | "string" | "number" | "array";
export declare type ValidateConditions = {
    type?: DataType;
    hasProperties?: Array<string>;
    minLength?: number;
    maxLength?: number;
    isInteger?: boolean;
};
export declare type PropertyValidatorPair = {
    property: string;
    source?: BodySource;
    conditions: ValidateConditions;
};
export declare enum BodySource {
    BODY = "body",
    QUERY = "query",
    HEADERS = "headers"
}
