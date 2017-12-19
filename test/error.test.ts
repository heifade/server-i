import { expect } from "chai";
import { ask } from "./util/ask";
import "mocha";
import { startServer, stopServer } from "./util/server";
import { AppConfig } from "../src/index";

describe("appConfig error", function() {
  beforeEach(async () => {
    await startServer();
  });
  afterEach(async () => {
    await stopServer();
  });
  it("appConfig.dbConfig is null", async () => {
    let pars = [`select 1`];

    AppConfig.dbConfig = null;

    let result = await ask(`exec`, pars);
    expect(result.result).to.be.equal("error");
    expect(result.msg).to.be.equal("AppConfig.dbConfig can not be null!");
  });

  it("appConfig.dbConfig.host is null", async () => {
    let pars = [`select 1`];

    AppConfig.dbConfig.host = null;

    let result = await ask(`exec`, pars);
    expect(result.result).to.be.equal("error");
    expect(result.msg).to.be.equal("AppConfig.dbConfig.host can not be null!");
  });

  it("appConfig.dbConfig.database is null", async () => {
    let pars = [`select 1`];

    AppConfig.dbConfig.database = null;

    let result = await ask(`exec`, pars);
    expect(result.result).to.be.equal("error");
    expect(result.msg).to.be.equal("AppConfig.dbConfig.database can not be null!");
  });
  it("appConfig.dbConfig.user is null", async () => {
    let pars = [`select 1`];

    AppConfig.dbConfig.user = null;

    let result = await ask(`exec`, pars);
    expect(result.result).to.be.equal("error");
    expect(result.msg).to.be.equal("AppConfig.dbConfig.user can not be null!");
  });
});
