import {
    HttpMethod,
    ClassDecorator,
    FunctionDecorator,
    Constructor,
    RouterHandler,
    ValidateConditions,
    BodySource, PropertyValidatorPair
} from "./Types"
import {Controller} from "./Controller"
import {NextFunction,Request,Response} from "express";
import {validateAllConditions} from "./Validation";

//<editor-fold desc="Controller Decorator">
export function RouterController(route:string):ClassDecorator{
    return function <T extends Constructor>(construct:T): T{
        if(!(construct.prototype instanceof Controller)){
            throw `Class ${construct.name} instance of Controller`
        }
        return class extends construct {
            static readonly _className=construct.name;
            static readonly _route=route;
        }
    }
}
//</editor-fold>


//<editor-fold desc="HTTP Methods Decorators">
export type HttpMethodDecorator=(route:string)=>FunctionDecorator

function httpMethodDecoratorFactory(method:HttpMethod):HttpMethodDecorator{
    return function(route:string){
        return function(target:any, propertyKey: string, descriptor: PropertyDescriptor){
            if(!(target instanceof Controller)){
                throw `Class ${target.constructor.name} should extend class Controller!`;
            }
            const constructor=<any>target.constructor;
            if(!constructor._handlers){
                constructor._handlers=<RouterHandler[]>[];
            }

            constructor._handlers.push(<RouterHandler>{
                route,
                method,
                handler:descriptor.value
            });
            return descriptor;
        }
    }
}

export const Get=httpMethodDecoratorFactory("get");
export const All=httpMethodDecoratorFactory("all");
export const Post=httpMethodDecoratorFactory("post");
export const Put=httpMethodDecoratorFactory("put");
export const Delete=httpMethodDecoratorFactory("delete");
export const Patch=httpMethodDecoratorFactory("patch");
export const Options=httpMethodDecoratorFactory("options");
export const Head=httpMethodDecoratorFactory("head");
export const Checkout=httpMethodDecoratorFactory("checkout");
export const Copy=httpMethodDecoratorFactory("copy");
export const Lock=httpMethodDecoratorFactory("lock");
export const Merge=httpMethodDecoratorFactory("merge");
export const Mkactivity=httpMethodDecoratorFactory("mkactivity");
export const Mkcol=httpMethodDecoratorFactory("mkcol");
export const Move=httpMethodDecoratorFactory("move");
export const Notify=httpMethodDecoratorFactory("notify");
export const Purge=httpMethodDecoratorFactory("purge");
export const Report=httpMethodDecoratorFactory("report");
export const Search=httpMethodDecoratorFactory("search");
export const Subscribe=httpMethodDecoratorFactory("subscribe");
export const Trace=httpMethodDecoratorFactory("trace");
export const Unlock=httpMethodDecoratorFactory("unlock");
export const Unsubscribe=httpMethodDecoratorFactory("unsubscribe");
//</editor-fold>

//<editor-fold desc="Validate Decorators">
const descriptorValidatorsMap=new Map<PropertyDescriptor,[PropertyValidatorPair]>();

export function Validate(parameterName:string,conditions:ValidateConditions,source:BodySource){
    return function(target:any, propertyKey:string,descriptor:PropertyDescriptor){
        let descriptorValidators=descriptorValidatorsMap.get(descriptor);
        const propertyValidatorPair={property:parameterName,source,conditions};
        if(descriptorValidators){
            descriptorValidators.push(propertyValidatorPair);
        }else{
            const originalFunction=descriptor.value;
            descriptorValidators=[propertyValidatorPair];
            descriptor.value=function(req:Request,res:Response,next:NextFunction){
                const {isValid,validated}=validateAllConditions(descriptorValidators,req,res);
                if(isValid){
                    originalFunction.bind(this)(req,res,next,validated);
                }
            };
            descriptorValidatorsMap.set(descriptor,descriptorValidators);
        }
        return descriptor;
    }
}
//</editor-fold>