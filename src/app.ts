import * as express from "express";
import * as bodyParser from "body-parser";
import { save } from "./business/save";
import { select } from "./business/select";

let app = express();

app.use("/static", express.static("static"));

app.use(bodyParser.json());

app.use("/save", function(req, res, next) {
  let list = req.body;

  save(list)
    .then(result => {
      res.send({
        result: "success",
        data: result
      });
      next();
    })
    .catch(err => {
      res.send({
        result: "error",
        msg: err
      });
      next();
    });
});

app.use("/select", function(req, res, next) {
  let sql = req.body.sql;
  let where = req.body.where;
  select(sql, where)
    .then(result => {
      res.send({
        result: "success",
        data: result
      });
      next();
    })
    .catch(err => {
      res.send({
        result: "error",
        msg: err
      });
      next();
    });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
