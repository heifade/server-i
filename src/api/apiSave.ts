import { NextFunction, Request, Response } from "express";
import { save } from "../business/save";

/**
 * 保存
 * 
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function apiSave(req: Request, res: Response, next: NextFunction) {
  let list = req.body;
  save(list)
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
