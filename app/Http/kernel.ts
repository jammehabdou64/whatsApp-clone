import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { auth, guest } from "jcc-express-mvc";
import { inertia } from "jcc-express-mvc/Core/Inertia";

export class Kernel {
  //

  public middlewares = [
    morgan("dev"),
    cookieParser(),
    cors(),
    session({
      secret: "ggggggg",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
    flash(),
    fileUpload(),
    inertia({ rootView: "index" }),
  ];

  public middlewareAliases = {
    auth,
    guest,
  };
}
