import { expect } from "chai";
import { fetchHelper } from "./fetchHelper";
import { app } from "../src/app";
import "mocha";
import { Server } from "http";
import * as request from "supertest";
import { config } from "./server.config";

describe("exec", function() {
  let server: Server;
  before(done => {
    server = app.listen(3000, function() {
      let host = server.address().address;
      let port = server.address().port;

      console.log("Server listening at http://%s:%s", host, port);

      done();
    });
  });

  after(done => {
    server.close(done);
  });

  it("exec", done => {
      // let pars = [`create table if not exists tbl_server_test1(id int primary key, value varchar(100))`, `create table if not exists tbl_server_test2(id int primary key, value varchar(100))`];

      // let result = await fetchHelper(`exec`, pars);

      // let json = await result.json();
      // expect(json.result === "success" && json.data === true).to.be.true;

      // console.log(111);

      let pars = [`create table if not exists tbl_server_test1(id int primary key, value varchar(100))`, `create table if not exists tbl_server_test2(id int primary key, value varchar(100))`];

      request(server)
        .post(`/exec`)
        .send(pars)
        .expect(200)
        .end((err, res) => {
          let json = res.body;
          expect(json.result === "success").to.be.true;
          console.log(11122);
          done();
        });
    
  });
});
