import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("slug").unique().nullable();
      table.string("phone").unique();
      table.string("avatar").nullable();
      table.string("email").unique().nullable();
      table.string("password");
      table.enum("status", [`online`, `offline`]).default("'offline'");
      table.dateTime("last_seen").nullable();
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("users");
  }
}
