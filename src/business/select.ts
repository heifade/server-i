import { Select, ConnectionHelper } from "mysql-i";
import { AppConfig } from "../appConfig";

/**
 * 查询一个SQL
 * 
 * @export
 * @param {string} sql - SQL语句
 * @param {Array<any>} where - 条件数组
 * @returns 
 */
export async function select(sql: string, where: Array<any>) {
  let conn = await ConnectionHelper.create(AppConfig.dbConfig);

  try {
    let result = await Select.select(conn, {
      sql,
      where
    });
    return result;
  } finally {
    await ConnectionHelper.close(conn);
  }
}
