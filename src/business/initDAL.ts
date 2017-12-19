import { UserDAL } from './userDAL';
import { TokenDAL } from './tokenDAL';

export class InitDAL {
  public static async init () {
    await UserDAL.createTable();
    await TokenDAL.createTable();
  }
}