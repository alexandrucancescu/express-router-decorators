import {ClassDecorator,Constructor} from "../Types";
import {Controller} from "../Controller";

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