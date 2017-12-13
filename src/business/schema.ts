import { Exec, ConnectionHelper, SaveType, Transaction, Schema } from "mysql-i/es";
import { connConfig } from "./connConfig";

export async function cleanSchema(database: string) {
  // let conn = await ConnectionHelper.create(connConfig);

  await Schema.clear(database);
}
