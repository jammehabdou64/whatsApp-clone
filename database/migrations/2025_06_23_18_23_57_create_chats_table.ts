import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("chats", (table) => {
      table.id();
      table.enum("chat_type", ["private", "group"]);
      table.string("name").nullable();
      table.string("avatar").nullable();
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("chats");
  }
}
