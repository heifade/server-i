import { expect } from "chai";
import { app } from "../src/app";
import "mocha";
import * as request from "supertest";

describe("exec", function() {
  it("exec", done => {
    // let pars = [`create table if not exists tbl_server_test1(id int primary key, value varchar(100))`, `create table if not exists tbl_server_test2(id int primary key, value varchar(100))`];

    // let result = await fetchHelper(`exec`, pars);

    // let json = await result.json();
    // expect(json.result === "success" && json.data === true).to.be.true;

    // console.log(111);

    let pars = [`create table if not exists tbl_server_test3(id int primary key, value varchar(100))`, `create table if not exists tbl_server_test2(id int primary key, value varchar(100))`];

    request(app)
      .post(`/exec`)
      .send(pars)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(1, err);
          return done(err);
        }
        let json = res.body;
        console.log(2, json);
        expect(json.result === "success").to.be.true;
        done();
      });
  });
});
