import { expect } from "chai";
import { ask } from "./fetchHelper";
import "mocha";

let url = "http://localhost:3000";

let tableName = "tbl_server_test_save";

let getData = async function(where: Array<any>) {
  let whereSQL = "";
  where.map(m => {
    whereSQL += "?,";
  });
  whereSQL = whereSQL.replace(/,$/, "");
  let pars = {
    sql: `select * from ${tableName} where value in (${whereSQL})`,
    where: where
  };

  try {
    return await ask(`select`, pars);
  } catch (err) {
    return null;
  }
};

let getDataByIds = async function(where: Array<any>) {
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
    let pars = [`drop table if exists ${tableName}`, `create table if not exists ${tableName}(id int primary key auto_increment, value varchar(100) not null)`];
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
      }
    ];

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal("success");

    let sr = await getDataByIds([1, 2, 3, 4]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(4);
  });

  it("update", async () => {
    let value1 = `${new Date().getTime()}, ${Math.random()}`;
    let value2 = `${new Date().getTime()}, ${Math.random()}`;
    let value3 = `${new Date().getTime()}, ${Math.random()}`;

    let list = [
      {
        data: {
          id: 1,
          value: value1
        },
        table: tableName,
        saveType: "2"
      },
      {
        data: {
          id: 2,
          value: value2
        },
        table: tableName,
        saveType: "u"
      },
      {
        data: {
          id: 3,
          value: value3
        },
        table: tableName,
        saveType: "update"
      }
    ];

    let sr = await getDataByIds([1, 2, 3]);
    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(3);
    let dlist = sr.data as Array<any>;
    dlist.map(m => {
      switch (m.id) {
        case 1:
          expect(m.value).not.to.be.equal(value1);
          break;
        case 2:
          expect(m.value).not.to.be.equal(value2);
          break;
        case 3:
          expect(m.value).not.to.be.equal(value3);
          break;
      }
    });

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal("success");

    sr = await getDataByIds([1,2,3]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(3);
    dlist = sr.data as Array<any>;
    dlist.map(m => {
      switch (m.id) {
        case 1:
          expect(m.value).to.be.equal(value1);
          break;
        case 2:
          expect(m.value).to.be.equal(value2);
          break;
        case 3:
          expect(m.value).to.be.equal(value3);
          break;
      }
    });

  });

  it("replace", async () => {
    let value1 = `${new Date().getTime()}, ${Math.random()}`;
    let value2 = `${new Date().getTime()}, ${Math.random()}`;
    let value3 = `${new Date().getTime()}, ${Math.random()}`;

    let list = [
      {
        data: {
          id: 1,
          value: value1
        },
        table: tableName,
        saveType: "4"
      },
      {
        data: {
          id: 2,
          value: value2
        },
        table: tableName,
        saveType: "r"
      },
      {
        data: {
          id: 3,
          value: value3
        },
        table: tableName,
        saveType: "replace"
      }
    ];

    let sr = await getData([value1, value2, value3]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(0);

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal("success");

    sr = await getData([value1, value2, value3]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(3);
  });

  it("delete", async () => {
    let list = [
      {
        data: {
          id: 1,
          value: "1"
        },
        table: tableName,
        saveType: "3"
      },
      {
        data: {
          id: 2,
          value: "1"
        },
        table: tableName,
        saveType: "d"
      },
      {
        data: {
          id: 3,
          value: "1"
        },
        table: tableName,
        saveType: "delete"
      }
    ];

    let sr = await getDataByIds([1, 2, 3]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(3);

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal("success");

    sr = await getDataByIds([1, 2, 3]);

    expect(sr.result).to.be.equal("success");
    expect(sr.data.length).to.be.equal(0);
  });


  it("save when error", async () => {
    let value1 = `${new Date().getTime()}, ${Math.random()}`;
    

    let list = [
      {
        data: {
          id: 1,
        },
        table: tableName,
        saveType: "1"
      }
    ];

    let saveResult = await ask(`save`, list);

    expect(saveResult.result).to.be.equal('error');
    expect(saveResult.msg.code).to.be.equal('ER_NO_DEFAULT_FOR_FIELD');

    

    
  });
});
