import { NextFunction, Request, Response } from "express";
import { cleanSchema } from "../business/schema";
import { isArray, isString } from "util";

export function apiCleanCache(req: Request, res: Response, next: NextFunction) {
  let databaseList = req.body;

  let asyncFunc = async function() {
    if (isArray(databaseList)) {
      for (let database of databaseList) {
        await cleanSchema(database);
      }
    } else {
      return Promise.reject("Please input is array!");
    }
  };

  asyncFunc()
    .then(result => {
      res.send({
        result: "success",
        data: result
      });
      next();
    })
    .catch(err => {
      res.send({
        result: "error",
        msg: err
      });
      next();
    });
}
