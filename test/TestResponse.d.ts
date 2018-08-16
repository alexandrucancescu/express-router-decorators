/// <reference types="express" />
import * as express from "express";
export default class TestResponse implements express.Response {
    private statusCode;
    private response;
    private redirectedTo;
    status(code: number): express.Response;
    sendStatus(code: number): express.Response;
    json(body: any): express.Response;
    get(field: string): string;
    header(field: any): Response;
    header(field: string, value?: string): Response;
    redirect(url: string): void;
    redirect(status: number, url: string): void;
    redirect(url: string, status: number): void;
    set(field: any): Response;
    set(field: string, value?: string): Response;
    set(field: string, value?: string[]): Response;
}
