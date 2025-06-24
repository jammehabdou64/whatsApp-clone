import { Model } from "jcc-eloquent";
import { Str } from "jcc-express-mvc/Core/Str";

export class User extends Model {
  protected static hidden: string[] = ["password"];

  static booted() {
    this.created(async (user) => {
      user.slug = Str.slug(user.name) + "-" + user.id;
      await user.save();
    });
  }
}
