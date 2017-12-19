import { config } from "./server.config";
import * as request from "supertest";

import { getApp } from "../src/index";
import { AppConfig } from "../src/appConfig";

let setConfig = function() {
  AppConfig.dbConfig = {
    host: "localhost",
    user: 'travis',
    database: 'test',
    password: '',
    port: 3306
  }
}
setConfig();

export async function ask(url: string, pars: any) {
  return new Promise<any>((resolve, reject) => {
    request(getApp())
      .post(`/${url}`)
      .send(pars)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body);
      });
  });
}
