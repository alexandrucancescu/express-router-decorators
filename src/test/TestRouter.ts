import {Controller} from ".."
import {Post,Validate,Lock,RouterController} from "../decorators"
import {Response,Request,NextFunction} from "express"

@RouterController("/")
export default class TestRouter extends Controller{

    @Post("/")
    @Validate("name",{type:"string"})
    @Validate("age",{type:"number"})
    @Validate("locations",{type:"array"})
    public async postPerson(req:Request,res:Response,next:NextFunction){
        res.json({ok:true,secret:"trains"});
    }

    @Lock("/")
    @Validate("name",{type:"string"})
    public lock(req:Request,res:Response,next:NextFunction){
        res.send();
    }
}