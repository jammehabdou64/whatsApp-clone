import { Schema } from "jcc-eloquent";
export class Migration {
  up() {
    return Schema.table("users", (table) => {
      table.string("slug").unique().nullable().after("name");
    });
  }

  down() {
    return Schema.table("users", (table) => {
      table.dropColumns("slug");
    });
  }
}
