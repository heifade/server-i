import { NextFunction, Request, Response } from "express";
import { ExecDAL } from "../business/execDAL";
import { Check } from "../util/check";

/**
 * 执行
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function apiExec(req: Request, res: Response, next: NextFunction) {
  (async function() {
    let isLogin = await Check.checkLogin(req, res);
    if (!isLogin) {
      next();
      return;
    }

    console.log(isLogin);

    try {
      await ExecDAL.exec(req.body);

      res.send({
        result: "success",
        data: null
      });
      next();
    } catch (err) {
      res.send({
        result: "error",
        code: err.code,
        msg: err.message
      });
      next();
    }
  })()
    .then()
    .catch();
}
