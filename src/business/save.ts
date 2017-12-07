import { Save, ConnectionHelper, SaveType } from "mysql-i/es";
import { connConfig } from "./connConfig";

export async function save(list: Array<any>) {
  let conn = await ConnectionHelper.create(connConfig);
  return await Save.savesSeqWithTran(conn, list);
}
