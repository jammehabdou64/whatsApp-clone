import { Model } from "jcc-eloquent";

export class User extends Model {
  protected static hidden: string[] = ["password"];
}
