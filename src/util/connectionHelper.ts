import { Check } from "./check";
import { ConnectionHelper } from "mysql-i/es";
import { Connection } from "mysql";

export async function getConnection() {
  let appConfig = await Check.getAppConfig();
  return await ConnectionHelper.create(appConfig.dbConfig);
}
