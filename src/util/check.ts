import { Request, Response } from "express";
import { AppConfig } from "../appConfig";
import { Select } from "mysql-i/es";
import { getConnection } from "./connectionHelper";
import { TokenDAL } from "../business/tokenDAL";

export class Check {
  public static async getAppConfig() {
    if (!AppConfig.dbConfig) {
      throw new Error("AppConfig.dbConfig can not be null!");
    }
    if (!AppConfig.dbConfig.host) {
      throw new Error("AppConfig.dbConfig.host can not be null!");
    }
    if (!AppConfig.dbConfig.database) {
      throw new Error("AppConfig.dbConfig.database can not be null!");
    }
    if (!AppConfig.dbConfig.user) {
      throw new Error("AppConfig.dbConfig.user can not be null!");
    }
    return AppConfig;
  }

  public static async checkLogin(req: Request, res: Response) {
    if(req.header("userId") === null) {

    }
    let userId = req.header("userId");
    
    let isLogin = await TokenDAL.isActive(Number(userId));
    if (!isLogin) {
      res.send({
        result: "error",
        msg: "请先登录！"
      });
      return false;
    }
    return true;
  }
}
