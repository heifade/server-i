import { Exec, ConnectionHelper, SaveType, Transaction, Schema } from "mysql-i";

export class SchemaDAL {
  /**
   * 清缓存
   *
   * @export
   * @param {string} database
   */
  public static async clean(database: string) {
    await Schema.clear(database);
  }
}
