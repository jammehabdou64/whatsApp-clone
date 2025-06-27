import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("messages", (table) => {
      table.id();
      table.unsignedBigInteger("sender_id");
      table.unsignedBigInteger("recepient_id");
      table.unsignedBigInteger("chat_id");
      table.text("body").nullable();
      table
        .enum("type", ["text", "image", "video", "audio", "document"])
        .default("'text'");
      table.string("media_url").nullable(); // if media message
      table.string("`read`", 10).default("false");
      table.timestamps();
      table.softDeletes();
      table.foreign("sender_id").references("id").on("users");
      table.foreign("recepient_id").references("id").on("users");
      table.foreign("chat_id").references("id").on("chats");
    });
  }

  down() {
    return Schema.dropTable("messages");
  }
}
