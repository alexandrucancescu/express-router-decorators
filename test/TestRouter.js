"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const decorators_1 = require("../decorators");
let TestRouter = class TestRouter extends __1.Controller {
    postPerson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ ok: true, secret: "trains" });
        });
    }
    lock(req, res, next) {
        res.send();
    }
};
__decorate([
    decorators_1.Post("/"),
    decorators_1.Validate("name", { type: "string" }),
    decorators_1.Validate("age", { type: "number" }),
    decorators_1.Validate("locations", { type: "array" })
], TestRouter.prototype, "postPerson", null);
__decorate([
    decorators_1.Lock("/"),
    decorators_1.Validate("name", { type: "string" })
], TestRouter.prototype, "lock", null);
TestRouter = __decorate([
    decorators_1.RouterController("/")
], TestRouter);
exports.default = TestRouter;
