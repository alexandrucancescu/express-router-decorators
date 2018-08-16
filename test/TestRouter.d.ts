/// <reference types="express" />
import { Controller } from "../index";
import { Response, Request, NextFunction } from "express";
export default class TestRouter extends Controller {
    postPerson(req: Request, res: Response, next: NextFunction): Promise<void>;
    lock(req: Request, res: Response, next: NextFunction): void;
}
