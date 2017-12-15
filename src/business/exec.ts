import { Exec, ConnectionHelper, SaveType, Transaction } from "mysql-i/es";
import { connConfig } from "./connConfig";

export async function exec(list: string[]) {
  let conn = await ConnectionHelper.create(connConfig);

  try {
    await Transaction.begin(conn);
    await Exec.execsSeq(conn, list);
    await Transaction.commit(conn);
    return true;
  } catch (err) {
    await Transaction.rollback(conn);
    return false;
  } finally {
    await ConnectionHelper.close(conn);
  }
}
