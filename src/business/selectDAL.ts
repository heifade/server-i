import { Select, ConnectionHelper } from "mysql-i";
import { getConnection } from "../util/connectionHelper";

export class SelectDAL {
  /**
   * 查询一个SQL
   *
   * @export
   * @param {string} sql - SQL语句
   * @param {Array<any>} where - 条件数组
   * @returns
   */
  public static async select(sql: string, where: Array<any>) {
    let conn;
    try {
      conn = await getConnection();
      let result = await Select.select(conn, {
        sql,
        where
      });
      return result;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }
}
