import { NextFunction, Request, Response } from "express";
import { InitDAL } from "../business/initDAL";

/**
 * 初始化数据库
 * 
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function apiInit(req: Request, res: Response, next: NextFunction) {
  InitDAL.init()
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
