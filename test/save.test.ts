import { expect } from "chai";
import { fetchHelper } from "./fetchHelper";
import "../src/app";
import "mocha";

let url = "http://localhost:3000";

let tableName = "tbl_server_test_save";

let getData = async function(where: Array<any>) {
  let pars = {
    sql: `select * from ${tableName} where value=?`,
    where: where
  };

  let result = await fetchHelper("select", pars);

  return await result.json();
};

describe("save", function() {
  before(done => {
    (async function() {
      let pars = [`create table if not exists ${tableName}(id int primary key auto_increment, value varchar(100))`];
      await fetchHelper(`exec`, pars);
      await fetchHelper(`cleanCache`, ["test"]);
    })().then(() => {
      done();
    });
  });

  it("insert", done => {
    let asyncFunc = async function() {
      let value = `${new Date().getTime()}`;

      let list = [
        {
          database: "test",
          data: {
            value: value
          },
          table: tableName,
          saveType: "i"
        }
      ];

      let saveResult = await fetchHelper(`save`, list);
      let json = await saveResult.json();

      expect(json.result === "success");

      let sr = await getData([value]);

      expect(sr.result === "success" && sr.data.length === 1).to.be.true;
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
