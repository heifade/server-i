import { expect } from "chai";
import fetch from "node-fetch";
import "../src/app";
import "mocha";

let url = "http://localhost:3000";

let getData = async function(where: Array<any>) {
  let selectPars = {
    sql: "select * from tbl1 where name=?",
    where: where
  };

  let result = await fetch(`${url}/select`, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(selectPars)
  });

  return await result.json();
};

describe("app", function() {
  it("save", done => {
    let asyncFunc = async function() {
      let value = `${new Date().getTime()}`;

      let list = [
        {
          database: "test",
          data: {
            name: value,
            value: value
          },
          table: "tbl1",
          saveType: 1
        }
      ];

      let saveResult = await fetch(`${url}/save`, {
        method: "post",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(list)
      });

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
