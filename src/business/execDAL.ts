import { Exec, ConnectionHelper, SaveType, Transaction } from "mysql-i";
import { getConnection } from "../util/connectionHelper";

export class ExecDAL {
  /**
   * 执行SQL（事务）
   *
   * @export
   * @param {string[]} list - SQL数组
   * @returns
   */
  public static async exec(list: string[]) {
    let conn;
    try {
      conn = await getConnection();
      await Transaction.begin(conn);
      await Exec.execsSeq(conn, list);
      await Transaction.commit(conn);
    } catch (err) {
      if (conn) {
        await Transaction.rollback(conn);
      }
      throw err;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }
}
