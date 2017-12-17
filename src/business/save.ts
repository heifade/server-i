import { Save, ConnectionHelper, SaveType } from "mysql-i";
import { connConfig } from "./connConfig";

/**
 * 保存多条数据(事务)
 * 
 * @export
 * @param {Array<any>} list 
 */
export async function save(list: Array<any>) {
  let conn = await ConnectionHelper.create(connConfig);

  list.map(m => {
    switch ((m.saveType + "").toLowerCase()) {
      case "2":
      case "u":
      case "update":
        m.saveType = SaveType.update;
        break;
      case "3":
      case "d":
      case "delete":
        m.saveType = SaveType.delete;
        break;
      case "4":
      case "r":
      case "replace":
        m.saveType = SaveType.replace;
        break;
      case "1":
      case "i":
      case "insert":
      default:
        m.saveType = SaveType.insert;
        break;
    }

    m.saveType = m.saveType;
  });

  try {
    await Save.savesSeqWithTran(conn, list);
  } finally {
    await ConnectionHelper.close(conn);
  }
}
