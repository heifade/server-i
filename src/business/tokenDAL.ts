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
          create_date datetime default current_timestamp,
          update_date datetime default current_timestamp,
        )
      `
      );
    } finally {
      await ConnectionHelper.close(conn);
    }
  }

  public static async add(userId: number, token: string) {
    let conn;
    try {
      conn = await getConnection();

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
