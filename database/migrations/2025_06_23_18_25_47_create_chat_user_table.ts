import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("chat_user", (table) => {
      table.id();
      table.unsignedBigInteger("chat_id");
      table.unsignedBigInteger("user_id");
      table.string("is_admin", 10).default("false"); // 0: no, 1: yes
      table.timestamps();
      table.softDeletes();
      table.foreign("chat_id").references("id").on("chats");
      table.foreign("user_id").references("id").on("users");
    });
  }

  down() {
    return Schema.dropTable("chat_users");
  }
}
