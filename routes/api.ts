import { MessagesController } from "@Controllers/MessagesController";
import { Route } from "jcc-express-mvc/Core";

Route.get("/", [MessagesController, "index"]);
