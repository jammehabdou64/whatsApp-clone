import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("chats", (table) => {
      table.id();
      table.unsignedBigInteger("created_by");
      table.unsignedBigInteger("recepient_id").nullable(); // for private chats
      table.enum("chat_type", ["private", "group"]);
      table.string("name").nullable();
      table.string("description").nullable();
      table.string("avatar").nullable();
      table.foreign("created_by").references("id").on("users");
      table.foreign("recepient_id").references("id").on("users");
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("chats");
  }
}
