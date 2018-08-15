import {RequestHandler} from "express";

export type HttpMethod= "get"|"all"|"post"|"put"|"delete"|"patch"|"options"|"head"|"checkout"|"copy"|"lock"|"merge"|"mkactivity"|"mkcol"|"move"|"notify"|"purge"|"report"|"search"|"subscribe"|"trace"|"unlock"|"unsubscribe";
export type ClassDecorator= <T extends Constructor>(constructor:T)=>T
export type FunctionDecorator=(target:any,propertyKey: string, descriptor: PropertyDescriptor)=>PropertyDescriptor
export type Constructor = { new (...args: any[]): any; }

export type RouterHandler= {route:string,method:HttpMethod,handler:Function|RequestHandler}

export type DataType="object"|"boolean"|"string"|"number"|"array";

export type ValidateConditions = {
    type?:DataType,
    hasProperties?:Array<string>,
    minLength?:number,
    maxLength?:number,
    isInteger?:boolean,
}

export type PropertyValidatorPair={
    property:string,
    source:BodySource,
    conditions:ValidateConditions
}

export enum BodySource {
    BODY="body",
    QUERY="query",
    HEADERS="headers",
}