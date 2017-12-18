import { DbConfig } from "./model/DBConfig";

const globalCacheHashKey = "AppConfigGlobalCacheHash";

export class AppConfig {
  private static getGlobalHash() {
    let globalCacheHash = Reflect.get(global, globalCacheHashKey);
    if (!globalCacheHash) {
      globalCacheHash = {};
      Reflect.set(global, globalCacheHashKey, globalCacheHash);
    }
    return globalCacheHash;
  }

  public static get(key: string) {
    return Reflect.get(AppConfig.getGlobalHash(), key);
  }
  public static set(key: string, value: any) {
    Reflect.set(AppConfig.getGlobalHash(), key, value);
  }

  public static get dbConfig(): DbConfig {
    return AppConfig.get("dbConfig");
  }
  public static set dbConfig(dbConfig: DbConfig) {
    AppConfig.set("dbConfig", dbConfig);
  }
}
