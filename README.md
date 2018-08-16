# express-router-decorators

[![Build Status](https://travis-ci.org/alexandrucancescu/express-router-decorators.svg?branch=master)](https://travis-ci.org/alexandrucancescu/express-router-decorators)

## What is it

Typescript framework on top of express to ease the declaration of **Routers** and do validations on requests.

## Features

* Define classes as express router controller with decorators
* Define class methods as request handlers with decorators
* Define simple and complex validations with decorators

## Install
```batch
$ npm install --save alexandrucancescu/express-router-decorators
```

## Quick start

```typescript
import {Validate,Controller,RouterController,Get,BodySource} from "express-router-decorators"
import * as express from "express"
import * as http from "http"

@RouterController("/")
class Index extends Controller{

    @Get("/")
    @Validate("name",{type:"string"},BodySource.QUERY)
    private getIndex(req:express.Request,res:express.Response,next:express.NextFunction){
        res.send("<h1>You passed the validation</h1>")
    }
}

const app=express();
const indexController=new Index();

indexController.mountOn(app);

http.createServer(app).listen(3000);
```
