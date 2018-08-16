"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestResponse {
    status(code) {
        this.statusCode = code;
        return this;
    }
    sendStatus(code) {
        this.statusCode = code;
        return this;
    }
    json(body) {
        this.response = body;
        return this;
    }
    get(field) {
        return "";
    }
    header(field, value) {
        return undefined;
    }
    redirect(url) {
        if (status) {
            this.statusCode = status;
        }
    }
    set(field, value) {
        return undefined;
    }
}
exports.default = TestResponse;
