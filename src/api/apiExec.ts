import { NextFunction, Request, Response } from "express";
import { exec } from "../business/exec";

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
