"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const save_1 = require("./business/save");
const select_1 = require("./business/select");
let app = express();
app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use("/save", function (req, res, next) {
    let list = req.body;
    save_1.save(list)
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
app.use("/select", function (req, res, next) {
    let sql = req.body.sql;
    let where = req.body.where;
    console.log(sql, where);
    select_1.select(sql, where)
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
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
//# sourceMappingURL=app.js.map