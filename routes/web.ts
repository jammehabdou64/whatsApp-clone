import { UsersController } from "@Controllers/UsersController";
import { Auth } from "jcc-express-mvc/";
import { Route } from "jcc-express-mvc/Core";

Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.middleware("guest").get("/login", (req, res) =>
  res.inertia("Auth/Login"),
);

Route.middleware("guest").get("/register", (req, res) =>
  res.inertia("Auth/Register"),
);

Route.prefix("/auth").group((Route) => {
  Route.post("/login", Auth.attempt);
  Route.post("/register", [UsersController, "store"]);
});

Route.get("/logout", Auth.logout);
