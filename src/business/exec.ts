import { Exec, ConnectionHelper, SaveType, Transaction } from "mysql-i";
import { AppConfig } from "../appConfig";

/**
 * 执行SQL（事务）
 * 
 * @export
 * @param {string[]} list - SQL数组
 * @returns 
 */
export async function exec(list: string[]) {
  let conn = await ConnectionHelper.create(AppConfig.dbConfig);

  try {
    await Transaction.begin(conn);
    await Exec.execsSeq(conn, list);
    await Transaction.commit(conn);
    return await Promise.resolve();
  } catch (err) {
    await Transaction.rollback(conn);
    return await Promise.reject(err);
  } finally {
    await ConnectionHelper.close(conn);
  }
}
