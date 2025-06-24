import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("phone").unique();
      table.string("avatar").nullable();
      table.string("email").unique().nullable();
      table.string("password");
      table.string("online", 10).default("false"); // 0: offline, 1: online, 2: typing
      table.dateTime("last_seen");
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("users");
  }
}
