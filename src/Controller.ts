import {RequestHandler, Router,Express} from "express"
import {RouterHandler} from "./Types"

class Controller{
    private readonly __innerRouter:Router;
    private readonly __route:string;
    private readonly __handlers:RouterHandler[];
    private readonly __className:string;

    constructor(){
        const constructor=<any>this.constructor;
        this.__route=constructor._route;
        this.__handlers=constructor._handlers;
        this.__className=constructor._className;
        if(!this.__className){
            throw `Class ${this.constructor.name} should have decorator @RouterController`;
        }
        if(!this.__route){
            throw `No route set on class ${this.__className}`
        }
        if(!this.__handlers){
            throw `Class ${this.__className} does not have any functions with HttpMethodDecorators like @Get("/") or @Post`
        }
        this.__innerRouter=Router();
        this.__handlers.forEach(this.addRouteHandler.bind(this))
    }

    private addRouteHandler(routerHandler:RouterHandler){
        this.__innerRouter[routerHandler.method](routerHandler.route,<RequestHandler>(<Function>routerHandler.handler).bind(this))
    }

    public mountOn(expressApp:Express):void{
        expressApp.use(this.__route,this.__innerRouter);
    }
}


export {
    Controller
}