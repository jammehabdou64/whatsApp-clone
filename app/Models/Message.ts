import { Model } from "jcc-eloquent";
import { User } from "./User";

export class Message extends Model {
  //
  protected static table = "messages";

  public sender() {
    return this.belongsTo(User, "sender_id");
  }

  public recipient() {
    return this.belongsTo(User, "recepient_id");
  }
}
