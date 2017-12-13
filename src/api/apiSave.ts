import { NextFunction, Request, Response } from "express";
import { save } from "../business/save";

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
