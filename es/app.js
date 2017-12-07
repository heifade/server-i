"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const save_1 = require("./business/save");
const select_1 = require("./business/select");
let app = express();
exports.app = app;
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
//# sourceMappingURL=app.js.map