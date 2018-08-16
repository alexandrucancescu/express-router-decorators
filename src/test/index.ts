import {describe,it} from "mocha"
import {expect} from "chai"
import * as chai from "chai"
import {match} from "sinon"
import { mockReq, mockRes } from 'sinon-express-mock'
import {validateAllConditions} from "../lib/Validation"
import sinonChai = require("sinon-chai");
import {BodySource, PropertyValidatorPair} from "../lib/Types";
import TestRouter from "./TestRouter";

chai.use(sinonChai);

const reqConfigPost={
    method:"POST",
    body:{
        name:"andu",
        age:21,
        locations:["romania","eu","cuba"],
        mother:{
            name:"unknown",
            age:"40"
        }
    }
};
const reqConfigLock=JSON.parse(JSON.stringify(reqConfigPost));
reqConfigLock.method="LOCK";

const reqConfigPostFalse=JSON.parse(JSON.stringify(reqConfigPost));
reqConfigPostFalse.body.locations=3;

const requestPost=mockReq(reqConfigPost);
const requestLock=mockReq(reqConfigLock);
const requestPostFalse=mockReq(reqConfigPostFalse);

describe("Router Validations",()=>{
    const router=new TestRouter();
    it("should send ok and secret",()=>{
        const req=requestPost;
        const res=mockRes();

        router.postPerson(req,res,null);
        expect(res.json).to.be.calledWith({ok:true,secret:"trains"});
    });
    it("should throw error for default body source",()=>{
        const req=requestLock;
        const res=mockRes();
        expect(()=>router.lock(req,res,null)).to.throw();
    });
    it("should send 403",()=>{
        const req=requestPostFalse;
        const res=mockRes();

        router.postPerson(req,res,null);
        expect(res.status).to.be.calledWith(403);
        expect(res.json).to.be.calledWith({ok:false,error:match.string});
    });
});

const validationNameTrue:PropertyValidatorPair={property:"name",source:BodySource.BODY,conditions:{type:"string"}};
const validationLocationsTrue:PropertyValidatorPair={property:"locations",source:BodySource.BODY,conditions:{type:"array"}};
const validationMotherTrue:PropertyValidatorPair={property:"mother",source:BodySource.BODY,conditions:{type:"object"}};


describe("Validation function",()=>{
    it("should 403 and {ok:false,error}",()=>{
        const req=requestPostFalse;
        const res=mockRes();

        const validations=[validationNameTrue,validationLocationsTrue];

        const result=validateAllConditions(validations,req,res);

        expect(res.status).to.be.calledWith(403);
        expect(res.json).to.be.calledWith({ok:false,error:match.string});
        expect(result.isValid).to.equal(false);
        expect(result.validated).to.be.undefined;
    });
    it("should send json {ok:true}",()=>{
        const req=requestPost;
        const res=mockRes();
        const validations=[validationNameTrue,validationLocationsTrue,validationMotherTrue];

        const result=validateAllConditions(validations,req,res);

        expect(res.json).to.have.not.been.called;
        expect(result.isValid).to.equal(true);
        expect(result.validated).to.deep.equal({
            name:"andu",
            locations:["romania","eu","cuba"],
            mother:{
                name:"unknown",
                age:"40"
            }
        });
    });
});