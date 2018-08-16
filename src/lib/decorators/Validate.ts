import {NextFunction, Request, Response} from "express";
import {validateAllConditions} from "../Validation";
import {PropertyValidatorPair, ValidateConditions, BodySource} from "../Types";

const descriptorValidatorsMap=new Map<PropertyDescriptor,[PropertyValidatorPair]>();

export function Validate(parameterName:string,conditions:ValidateConditions,source?:BodySource){
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