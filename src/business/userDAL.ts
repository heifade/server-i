import { Select, ConnectionHelper, Exec } from "mysql-i";
import { getConnection } from "../util/connectionHelper";

export class UserDAL {
  private static tableName = `tblUser`;

  public static async createTable() {
    let conn;
    try {
      conn = await getConnection();
      await Exec.exec(
        conn,
        ` create table if not exists ${this.tableName} (
            user_id bigint primary key,
            user varchar(100),
            user_name varchar(100),
            password varchar(100),
            create_date datetime default current_timestamp,
            update_date datetime default current_timestamp,
          )
        `
      );
    } finally {
      await ConnectionHelper.close(conn);
    }
  }

  public static async login(user: string, password: string) {
    let conn;
    try {
      conn = await getConnection();

      let result = await Select.select(conn, {
        sql: `select * from ${this.tableName} where user = ? and password = ?`,
        where: [user, password]
      });

      return result;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }
}
