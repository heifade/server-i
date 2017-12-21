import { Select, ConnectionHelper, Exec } from "mysql-i";
import { getConnection } from "../util/connectionHelper";
import { TokenDAL } from "./tokenDAL";
import { UserModel } from "../model/UserModel";

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
            update_date datetime default current_timestamp
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

      let userData = await Select.selectTop1(conn, {
        sql: `select * from ${this.tableName} where user = ? and password = ?`,
        where: [user, password]
      });
      let userModel: UserModel = null;
      if (userData) {
        TokenDAL.add(userData.user_id);
        userModel = new UserModel();
        userModel.userId = userData.user_id;
        userModel.name = userData.name;
      }

      return userModel;
    } finally {
      await ConnectionHelper.close(conn);
    }
  }
}
