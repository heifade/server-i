import { config } from "./server.config";
import fetch from "node-fetch";

import * as request from "supertest";

import { app } from "../src/app";

export async function fetchHelper(url: string, data: any) {
  return await fetch(`${config.url}/${url}`, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data)
  });
}

export async function ask(url: string, pars: any) {
  return new Promise<any>((resolve, reject) => {
    request(app)
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
