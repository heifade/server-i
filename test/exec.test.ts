import { expect } from "chai";
import { fetchHelper } from "./fetchHelper";
import '../src/app';
import "mocha";

let getData = async function() {
  let pars = {
    sql: `select * from information_schema.TABLES where TABLE_SCHEMA = 'test' and TABLE_NAME in (?,?)`,
    where: ["tbl_server_test1", "tbl_server_test2"]
  };

  let result = await fetchHelper("select", pars);

  return await result.json();
};

describe("exec", function() {
  it("exec", done => {
    let asyncFunc = async function() {
      let pars = [`create table if not exists tbl_server_test1(id int primary key, value varchar(100))`, `create table if not exists tbl_server_test2(id int primary key, value varchar(100))`];

      let result = await fetchHelper(`exec`, pars);

      let json = await result.json();
      expect(json.result === "success" && json.data === true).to.be.true;

      let tableList = await getData();
      expect(tableList.result === "success" && tableList.data.length == 2).to.be.true;
    };

    asyncFunc()
      .then(() => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
