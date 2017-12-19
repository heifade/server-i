import { expect } from "chai";
import { ask } from "./ask";
import "mocha";

let url = "http://localhost:3000";

let tableName = "tbl_server_test_select";

let getData = async function(where: Array<any>) {
  let whereSQL = "";
  where.map(m => {
    whereSQL += "?,";
  });
  whereSQL = whereSQL.replace(/,$/, "");
  let pars = {
    sql: `select * from ${tableName} where id in (${whereSQL})`,
    where: where
  };

  try {
    return await ask(`select`, pars);
  } catch (err) {
    return null;
  }
};

describe("save", function() {
  before(async () => {
    let pars = [`drop table if exists ${tableName}`, `create table if not exists ${tableName}(id int primary key auto_increment, value varchar(100))`];
    await ask(`exec`, pars);
    await ask(`cleanCache`, ["test"]);
  });

  it("insert", async () => {
    let value1 = `${new Date().getTime()}, ${Math.random()}`;
    let value2 = `${new Date().getTime()}, ${Math.random()}`;
    let value3 = `${new Date().getTime()}, ${Math.random()}`;
    let value4 = `${new Date().getTime()}, ${Math.random()}`;
    let value5 = `${new Date().getTime()}, ${Math.random()}`;

    let list = [
      {
        data: {
          id: 1,
          value: value1
        },
        table: tableName,
        saveType: "1"
      },
      {
        data: {
          id: 2,
          value: value2
        },
        table: tableName,
        saveType: "i"
      },
      {
        data: {
          id: 3,
          value: value3
        },
        table: tableName,
        saveType: "insert"
      },
      {
        data: {
          id: 4,
          value: value4
        },
        table: tableName,
        saveType: "insert"
      },
      {
        data: {
          id: 5,
          value: value5
        },
        table: tableName,
        saveType: "insert"
      }
    ];

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal("success");
  });

  it("select", async () => {
    let sr = await getData([1, 2, 3, 4, 5]);
    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(5);
  });

  it("select when error", async () => {
    let pars = {
      sql: `select *** from ${tableName} where id in (?)`,
      where: [1]
    };

    let result = await ask(`select`, pars);
    expect(result.result).to.be.equal("error");
  });
});
