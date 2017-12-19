import { getApp, AppConfig } from "../../src/index";
import { Server } from "http";
import { serverPort } from "./config";
import { resolve } from "dns";
import { ask } from "./ask";

let server: Server;

let haveInit = false;
async function init() {
  if (!haveInit) {
    haveInit = true;
    let result = await ask(`init`, {});
    return result;
  }
}

export async function startServer() {
  let promise = new Promise((resolve, reject) => {
    let setConfig = function() {
      AppConfig.dbConfig = {
        host: "localhost",
        user: "travis",
        database: "test",
        password: "",
        port: 3306
      };
    };
    setConfig();

    server = getApp().listen(serverPort, function() {
      let host = server.address().address;
      let port = server.address().port;

      // console.log("Server listening at http://%s:%s", host, port);

      resolve();
    });
  });
  await promise;

  await init();
}

export async function stopServer() {
  return new Promise((resolve, reject) => {
    server.close(() => {
      resolve();
    });
  });
}
