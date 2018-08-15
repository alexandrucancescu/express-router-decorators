import {BodySource, DataType, PropertyValidatorPair} from "./Types";
import {Request,Response} from "express"
import * as getValue from "get-value"
import setValue=require("set-value");

function validateAllConditions(propertyValidatorPairs:PropertyValidatorPair[],req:any,res:Response):{isValid:boolean,validated?:any}{
    const validatedObject={};
    for(let validatorStruct of propertyValidatorPairs){
        const {validated,valid,error}=validatePair(validatorStruct,req);
        if(!valid){
            res.status(403).json({ok:false,error});
            return {isValid:false};
        }
        setValue(validatedObject,validatorStruct.property,validated);
    }
    return {isValid:true,validated:validatedObject};
}

function validatePair(propertyValidatorPair:PropertyValidatorPair,req:Request):{validated?:any,valid:boolean,error?:string}{
    let source;
    let value;
    if(propertyValidatorPair.source===BodySource.HEADERS){
        value=req.get(propertyValidatorPair.property);
    }else{
        source=req[propertyValidatorPair.source];
        if(!source) return {valid:false,error:`Request ${source} missing!`};
        value=getValue(source,propertyValidatorPair.property);
    }
    if(value==undefined || value==null){
        return {valid:false,error:`Property ${propertyValidatorPair.property} is missing from request ${propertyValidatorPair.source}`}
    }

    let conditions=propertyValidatorPair.conditions;

    if(conditions.type){
        const convertFromString=propertyValidatorPair.source===BodySource.QUERY;
        const result=validateType(value,conditions.type,convertFromString);
        if(!result.valid){
            return {valid:false,error:`Property ${propertyValidatorPair.property} should be ${conditions.type}`};
        }else if(convertFromString){
            value=result.value;
        }
    }
    return {validated:value,valid:true};
}

function validateType(value:any,type:DataType,convertFromString:boolean):{value?:any,valid:boolean}{
    if(convertFromString){
        if(type==="boolean"){
            if(value==="true" || value==="false"){
                return {value:value==="true",valid:true}
            }
            return {valid:false};
        }else if(type==="number"){
            const newValue=Number(value);
            if(!newValue){
                return {valid:false}
            }
            return {valid:true,value:newValue}
        }
    }
    if(type==="array"){
        return Array.isArray(value) ? {valid:true,value} : {valid:false};
    }
    if(typeof value !== type){
        return {valid:false};
    }

    return {valid:true,value:value};
}

type ValidatorFunctionDeclaration={errorMessage:string,validator:(...any)=>boolean}
type ValidationResult={valid:boolean,error?:string}
type ValidatorFunction=(value:any,propertyName:string)=>ValidationResult;

function validateFunctionFactory(functionDeclaration:ValidatorFunctionDeclaration){
    return function(...args:any[]):ValidatorFunction{
        return function(value:any,propertyName:string):ValidationResult{
            const isValid=functionDeclaration.validator(value,...args);
            if(!isValid){
                const error=formatError(functionDeclaration.errorMessage,args,value,propertyName);
                return {valid:false,error};
            }
            return {valid:true}
        }
    }
}

function formatError(errorFormatString:string,args:any[],value:any,propertyName:string):string{
    let error=errorFormatString;
    error=error.replace("${PROP_NAME}",propertyName);
    error=error.replace("${VALUE}",value);
    for(let i=0;i<args.length;i++){
        error=error.replace(`\${ARG_${i}`,args[i]);
    }
    return error;
}

const minLengthDeclaration:ValidatorFunctionDeclaration={
    errorMessage:"Property ${PROP_NAME} should have a minimum length ${ARG_0}",
    validator:(value:string,length:number)=>value.length>=length
};

const indexEqualsDeclaration={
    errorMessage:"Property ${PROP_NAME} should have the ${ARG_0}th equal ${ARG_1}",
    validator:(value:string,index:number,toEqual:string)=>value.charAt(index)===toEqual
};

const minLength:(length)=>ValidatorFunction=validateFunctionFactory(minLengthDeclaration);
const indexEquals:(index:number,value:string)=>ValidatorFunction=validateFunctionFactory(indexEqualsDeclaration);


export{validateAllConditions}