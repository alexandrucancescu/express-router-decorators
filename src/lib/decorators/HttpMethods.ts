import {Controller} from "../Controller";
import {FunctionDecorator, HttpMethod,RouterHandler} from "../Types";

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

export const Get:HttpMethodDecorator=httpMethodDecoratorFactory("get");
export const All:HttpMethodDecorator=httpMethodDecoratorFactory("all");
export const Post:HttpMethodDecorator=httpMethodDecoratorFactory("post");
export const Put:HttpMethodDecorator=httpMethodDecoratorFactory("put");
export const Delete:HttpMethodDecorator=httpMethodDecoratorFactory("delete");
export const Patch:HttpMethodDecorator=httpMethodDecoratorFactory("patch");
export const Options:HttpMethodDecorator=httpMethodDecoratorFactory("options");
export const Head:HttpMethodDecorator=httpMethodDecoratorFactory("head");
export const Checkout:HttpMethodDecorator=httpMethodDecoratorFactory("checkout");
export const Copy:HttpMethodDecorator=httpMethodDecoratorFactory("copy");
export const Lock:HttpMethodDecorator=httpMethodDecoratorFactory("lock");
export const Merge:HttpMethodDecorator=httpMethodDecoratorFactory("merge");
export const Mkactivity:HttpMethodDecorator=httpMethodDecoratorFactory("mkactivity");
export const Mkcol:HttpMethodDecorator=httpMethodDecoratorFactory("mkcol");
export const Move:HttpMethodDecorator=httpMethodDecoratorFactory("move");
export const Notify:HttpMethodDecorator=httpMethodDecoratorFactory("notify");
export const Purge:HttpMethodDecorator=httpMethodDecoratorFactory("purge");
export const Report:HttpMethodDecorator=httpMethodDecoratorFactory("report");
export const Search:HttpMethodDecorator=httpMethodDecoratorFactory("search");
export const Subscribe:HttpMethodDecorator=httpMethodDecoratorFactory("subscribe");
export const Trace:HttpMethodDecorator=httpMethodDecoratorFactory("trace");
export const Unlock:HttpMethodDecorator=httpMethodDecoratorFactory("unlock");
export const Unsubscribe:HttpMethodDecorator=httpMethodDecoratorFactory("unsubscribe");