import { AppConfig } from "../appConfig";

export async function getAppConfig() {
  if (!AppConfig.dbConfig) {
    throw new Error('AppConfig.dbConfig can not be null!');
  }
  if (!AppConfig.dbConfig.host) {
    throw new Error('AppConfig.dbConfig.host can not be null!');
  }
  if (!AppConfig.dbConfig.database) {
    throw new Error('AppConfig.dbConfig.database can not be null!');
  }
  if (!AppConfig.dbConfig.user) {
    throw new Error('AppConfig.dbConfig.user can not be null!');
  }
  return AppConfig;
}
