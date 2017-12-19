import { NextFunction, Request, Response } from "express";
import { SchemaDAL } from "../business/schemaDAL";
import { isArray, isString } from "util";

/**
 * 清缓存
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function apiCleanCache(req: Request, res: Response, next: NextFunction) {
  let databaseList = req.body;

  let asyncFunc = async function() {
    if (isArray(databaseList)) {
      for (let database of databaseList) {
        await SchemaDAL.clean(database);
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
