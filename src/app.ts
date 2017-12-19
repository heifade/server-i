import * as express from "express";
import * as bodyParser from "body-parser";

import { apiSave } from "./api/apiSave";
import { apiSelect } from "./api/apiSelect";
import { apiExec } from "./api/apiExec";
import { apiCleanCache } from "./api/apiCleanCache";
import { apiInit } from "./api/apiInit";
import { Server } from "http";
import { Express } from "express-serve-static-core";

export function getApp(): Express {
  let app = express();

  app.use("/static", express.static("static"));

  app.use(bodyParser.json());

  app.use("/save", apiSave);

  app.use("/select", apiSelect);

  app.use("/exec", apiExec);

  app.use("/cleanCache", apiCleanCache);

  app.use("/init", apiInit);

  return app;
}
