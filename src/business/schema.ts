import { Exec, ConnectionHelper, SaveType, Transaction, Schema } from "mysql-i/es";
import { connConfig } from "./connConfig";

/**
 * 清缓存
 * 
 * @export
 * @param {string} database 
 */
export async function cleanSchema(database: string) {
  await Schema.clear(database);
}
