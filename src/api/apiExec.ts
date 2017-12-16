import { NextFunction, Request, Response } from "express";
import { exec } from "../business/exec";

export function apiExec(req: Request, res: Response, next: NextFunction) {
  let list = req.body;

  exec(list)
    .then(result => {
      console.log(11, result);
      res.send({
        result: "success",
        data: result
      });
      next();
    })
    .catch(err => {
      console.log(2, err);
      res.send({
        result: "error",
        msg: err
      });
      next();
    });
}
