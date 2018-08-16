"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const chai = require("chai");
const sinon_1 = require("sinon");
const sinon_express_mock_1 = require("sinon-express-mock");
const Validation_1 = require("../lib/Validation");
const sinonChai = require("sinon-chai");
const Types_1 = require("../lib/Types");
const TestRouter_1 = require("./TestRouter");
chai.use(sinonChai);
const mockRequest1 = sinon_express_mock_1.mockReq({
    method: "POST",
    body: {
        name: "andu",
        age: 21,
        locations: ["romania", "eu", "cuba"],
        mother: {
            name: "unknown",
            age: "40"
        }
    }
});
mocha_1.describe("Validate request router", () => {
    mocha_1.it("should send ok and secret", () => {
        const req = mockRequest1;
        const res = sinon_express_mock_1.mockRes();
        const router = new TestRouter_1.default();
        router.postPerson(req, res, null);
    });
});
const validationNameTrue = { property: "name", source: Types_1.BodySource.BODY, conditions: { type: "string" } };
const validationAgeFalse = { property: "age", source: Types_1.BodySource.BODY, conditions: { type: "string" } };
const validationLocationsTrue = { property: "locations", source: Types_1.BodySource.BODY, conditions: { type: "array" } };
const validationMotherTrue = { property: "mother", source: Types_1.BodySource.BODY, conditions: { type: "object" } };
mocha_1.describe("Validate conditions function", () => {
    mocha_1.it("should 403 and {ok:false,error}", () => {
        const req = mockRequest1;
        const res = sinon_express_mock_1.mockRes();
        const validations = [validationNameTrue, validationAgeFalse];
        const result = Validation_1.validateAllConditions(validations, req, res);
        chai_1.expect(res.status).to.be.calledWith(403);
        chai_1.expect(res.json).to.be.calledWith({ ok: false, error: sinon_1.match.string });
        chai_1.expect(result.isValid).to.equal(false);
        chai_1.expect(result.validated).to.be.undefined;
    });
    mocha_1.it("should send json {ok:true}", () => {
        const req = mockRequest1;
        const res = sinon_express_mock_1.mockRes();
        const validations = [validationNameTrue, validationLocationsTrue, validationMotherTrue];
        const result = Validation_1.validateAllConditions(validations, req, res);
        chai_1.expect(res.json).to.have.not.been.called;
        chai_1.expect(result.isValid).to.equal(true);
        chai_1.expect(result.validated).to.deep.equal({
            name: "andu",
            locations: ["romania", "eu", "cuba"],
            mother: {
                name: "unknown",
                age: "40"
            }
        });
    });
});
