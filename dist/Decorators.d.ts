import { ClassDecorator, FunctionDecorator, ValidateConditions, BodySource } from "./Types";
export declare function RouterController(route: string): ClassDecorator;
export declare type HttpMethodDecorator = (route: string) => FunctionDecorator;
export declare const Get: HttpMethodDecorator;
export declare const All: HttpMethodDecorator;
export declare const Post: HttpMethodDecorator;
export declare const Put: HttpMethodDecorator;
export declare const Delete: HttpMethodDecorator;
export declare const Patch: HttpMethodDecorator;
export declare const Options: HttpMethodDecorator;
export declare const Head: HttpMethodDecorator;
export declare const Checkout: HttpMethodDecorator;
export declare const Copy: HttpMethodDecorator;
export declare const Lock: HttpMethodDecorator;
export declare const Merge: HttpMethodDecorator;
export declare const Mkactivity: HttpMethodDecorator;
export declare const Mkcol: HttpMethodDecorator;
export declare const Move: HttpMethodDecorator;
export declare const Notify: HttpMethodDecorator;
export declare const Purge: HttpMethodDecorator;
export declare const Report: HttpMethodDecorator;
export declare const Search: HttpMethodDecorator;
export declare const Subscribe: HttpMethodDecorator;
export declare const Trace: HttpMethodDecorator;
export declare const Unlock: HttpMethodDecorator;
export declare const Unsubscribe: HttpMethodDecorator;
export declare function Validate(parameterName: string, conditions: ValidateConditions, source: BodySource): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
