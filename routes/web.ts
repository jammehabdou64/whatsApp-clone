import { AuthController } from "@Controllers/AuthController";
import { HomeController } from "@Controllers/HomeController";
import { UsersController } from "@Controllers/UsersController";
import { Auth } from "jcc-express-mvc/";
import { Route } from "jcc-express-mvc/Core";

Route.middleware("auth").get("/", [HomeController, "index"]);

Route.middleware("guest").get("/login", (req, res) =>
  res.inertia("Auth/Login"),
);

Route.middleware("guest").get("/register", (req, res) =>
  res.inertia("Auth/Register"),
);

Route.prefix("/auth")
  .controller(AuthController)
  .group((Route) => {
    Route.post("/login", "login");
    Route.post("/register", "register");
  });

Route.get("/logout", Auth.logout);
