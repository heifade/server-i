"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("mysql-i/es");
const connConfig_1 = require("./connConfig");
function save(list) {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = yield es_1.ConnectionHelper.create(connConfig_1.connConfig);
        return yield es_1.Save.savesSeqWithTran(conn, list);
    });
}
exports.save = save;
//# sourceMappingURL=save.js.map