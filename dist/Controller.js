"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Controller {
    constructor() {
        const constructor = this.constructor;
        this.__route = constructor._route;
        this.__handlers = constructor._handlers;
        this.__className = constructor._className;
        if (!this.__className) {
            throw `Class ${this.constructor.name} should have decorator @RouterController`;
        }
        if (!this.__route) {
            throw `No route set on class ${this.__className}`;
        }
        if (!this.__handlers) {
            throw `Class ${this.__className} does not have any functions with HttpMethodDecorators like @Get("/") or @Post`;
        }
        this.__innerRouter = express_1.Router();
        this.__handlers.forEach(this.addRouteHandler.bind(this));
    }
    addRouteHandler(routerHandler) {
        this.__innerRouter[routerHandler.method](routerHandler.route, routerHandler.handler.bind(this));
    }
    mountOn(expressApp) {
        expressApp.use(this.__route, this.__innerRouter);
    }
}
exports.Controller = Controller;
