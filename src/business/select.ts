import { Select, ConnectionHelper } from "mysql-i/es";
import { connConfig } from "./connConfig";

export async function select(sql: string, where: Array<any>) {
  let conn = await ConnectionHelper.create(connConfig);
  return await Select.select(conn, {
    sql,
    where
  });
}
