import * as express from "express";
import * as bodyParser from "body-parser";

import { apiSave } from "./api/apiSave";
import { apiSelect } from "./api/apiSelect";
import { apiExec } from "./api/apiExec";
import { apiCleanCache } from "./api/apiCleanCache";
import { Server } from "http";

export class ServerApp {
  private server: Server;
  constructor() {
    let app = express();

    app.use("/static", express.static("static"));

    app.use(bodyParser.json());

    app.use("/save", apiSave);

    app.use("/select", apiSelect);

    app.use("/exec", apiExec);

    app.use("/cleanCache", apiCleanCache);
  }

  start(port: number) {
    this.server = this.server.listen(port, function() {
      // let host = server.address().address;
      // let port = server.address().port;
      // console.log("Server listening at http://%s:%s", host, port);
    });
  }

  stop() {
    this.server.close();
  }
}
