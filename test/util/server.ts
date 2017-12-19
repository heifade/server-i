import { getApp, AppConfig } from "../../src/index";
import { Server } from "http";
import { serverPort } from './config';

let server: Server;
export async function startServer() {
  return new Promise((resolve, reject) => {
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
}

export async function stopServer() {
  return new Promise((resolve, reject) => {
    server.close(() => {
      resolve();
    });
  });
}
