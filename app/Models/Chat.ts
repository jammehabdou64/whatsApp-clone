import { Model } from "jcc-eloquent";
import { Message } from "./Message";

export class Chat extends Model {
  //

  public messages() {
    return this.hasMany(Message, "chat_id", "id");
  }
}
