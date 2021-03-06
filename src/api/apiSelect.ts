import { NextFunction, Request, Response } from "express";
import { SelectDAL } from "../business/selectDAL";

/**
 * 查询
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function apiSelect(req: Request, res: Response, next: NextFunction) {
  let sql = req.body.sql;
  let where = req.body.where;

  SelectDAL.select(sql, where)
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
