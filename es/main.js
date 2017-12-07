"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
var server = app_1.app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
//# sourceMappingURL=main.js.map