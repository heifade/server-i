import { getAppConfig } from "./check";
import { ConnectionHelper } from "mysql-i/es";
import { Connection } from "mysql";

export async function getConnection() {
  let appConfig = await getAppConfig();
  return await ConnectionHelper.create(appConfig.dbConfig);
}
