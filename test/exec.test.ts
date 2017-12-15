import { expect } from "chai";
import { app } from "../src/app";
import * as request from "supertest";
import { ask } from "./fetchHelper";
import "mocha";

let table = `tbl_server_test1`;

let getData = async function() {
  let pars = {
    sql: `select * from information_schema.TABLES where TABLE_SCHEMA = 'test' and TABLE_NAME in (?)`,
    where: [table]
  };

  try {
    return await ask(`select`, pars);
  } catch (err) {
    return null;
  }
};

describe("exec", function() {
  it("exec", async () => {
    let pars = [`drop table if exists ${table}`, `create table if not exists ${table}(id int primary key, value varchar(100))`];

    let result = await ask(`exec`, pars);
    expect(result.result === "success" && result.data === true).to.be.true;

    result = await getData();
    expect(result.result === "success" && result.data.length == 1).to.be.true;
  });
});
