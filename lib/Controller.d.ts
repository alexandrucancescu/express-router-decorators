import { Express } from "express";
declare class Controller {
    private readonly __innerRouter;
    private readonly __route;
    private readonly __handlers;
    private readonly __className;
    constructor();
    private addRouteHandler;
    mountOn(expressApp: Express): void;
}
export { Controller };
