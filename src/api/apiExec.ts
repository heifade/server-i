import { NextFunction, Request, Response } from "express";
import { exec } from "../business/exec";

/**
 * 执行
 * 
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function apiExec(req: Request, res: Response, next: NextFunction) {
  let list = req.body;

  exec(list)
    .then(() => {
      res.send({
        result: "success",
        data: null,
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
