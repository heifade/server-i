import { expect } from "chai";
import { app } from "../src/app";
import * as request from "supertest";
import { ask } from "./fetchHelper";
import "mocha";

let table1 = `tbl_server_test1`;
let table2 = `tbl_server_test2`;

let getData = async function(table: string) {
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
    let pars = [`drop table if exists ${table1}`, `create table if not exists ${table1}(id int primary key, value varchar(100))`];

    let result = await ask(`exec`, pars);
    expect(result.result === "success" && result.data === true).to.be.true;

    result = await getData('table1');
    expect(result != null && result.result === "success" && result.data.length == 1).to.be.true;
  });


  it("exec with error", async () => {
    let pars = [`drop table if exists ${table2}`, `create table  if not exists ${table2}(id int primary key, value varchar(100))`];

    let result = await ask(`exec`, pars);
    console.log(1, result);
    expect(result.result === "success" && result.data === true).to.be.true;

  });


});
