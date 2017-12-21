import { Select, ConnectionHelper, Exec, Save, SaveType } from "mysql-i";
import { getConnection } from "../util/connectionHelper";

export class TokenDAL {
  private static tableName = `tblUserToken`;

  public static async createTable() {
    let conn;
    try {
      conn = await getConnection();
      await Exec.exec(
        conn,
        ` create table if not exists ${this.tableName} (
          user_id bigint primary key,
          token varchar(100),
          expire datetime,
          active_flg bit default b'1',
          create_date datetime default current_timestamp,
          update_date datetime default current_timestamp
        )
      `
      );
    } finally {
      await ConnectionHelper.close(conn);
    }
  }

  /**
   * 当前用户的token是否有效
   * 
   * @static
   * @param {number} userId 
   * @returns 
   * @memberof TokenDAL
   */
  public static async isActive(userId: number, token: string) {
    let conn;
    try {
      conn = await getConnection();
      let count = await Select.selectCount(conn, {
        sql: `select * from ${this.tableName} where 
          expire > now() and active_flg = 1 and user_id = ? and token = ?`,
        where: [userId, token]
      });

      return count > 0;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }

  public static async add(userId: number) {
    let conn;
    try {
      conn = await getConnection();

      let token = await Select.selectGUID(conn);

      let result = await Save.save(conn, {
        data: { user_id: userId, token },
        table: this.tableName,
        saveType: SaveType.insert
      });

      return result;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }
}
