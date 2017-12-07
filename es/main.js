"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const save_1 = require("./business/save");
let app = express();
app.get("/", function (req, res) {
    save_1.save()
        .then(result => {
        res.send(result);
    })
        .catch(err => {
        res.send(err);
    });
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
//# sourceMappingURL=main.js.map