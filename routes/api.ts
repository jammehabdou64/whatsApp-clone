import { MessagesController } from "@Controllers/MessagesController";
import { Route } from "jcc-express-mvc/Core";

Route.get("/", [MessagesController, "create"]);
Route.middleware("auth").get("/messages/{id}", [MessagesController, "show"]);
