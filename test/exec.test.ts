import { expect } from "chai";
import { ask } from "./util/ask";
import "mocha";
import { startServer, stopServer } from "./util/server";

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
  before(async () => {
    await startServer();
  });
  after(async () => {
    await stopServer();
  });
  it("exec", async () => {
    let pars = [`drop table if exists ${table1}`, `create table if not exists ${table1}(id int primary key, value varchar(100))`];

    let result = await ask(`exec`, pars);
    expect(result.result).to.be.equal("success");

    result = await getData(table1);
    expect(result).not.to.be.null;
    expect(result.result).to.be.equal("success");
    expect(result.data.length).to.be.equal(1);
  });

  it("exec with error", async () => {
    let pars = [`drop table if exists ${table2}`, `create table if not exists ${table2}(id int primary key, value varchar(100))`];
    let result = await ask(`exec`, pars);

    expect(result).not.to.be.null;
    expect(result.result).to.be.equal("success");

    pars = [`create table ${table2}(id int primary key, value varchar(100))`];
    result = await ask(`exec`, pars);

    expect(result.result).to.be.equal("error");
    expect(result.code).to.be.equal("ER_TABLE_EXISTS_ERROR");
  });

  it("cleanCache with error", async () => {
    let result = await ask(`cleanCache`, { key: 1 });

    expect(result.result).to.be.equal("error");
    expect(result.msg).to.be.equal("Please input is array!");
  });
});
