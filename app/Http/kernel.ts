import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { auth, guest } from "jcc-express-mvc";
import FileStoreFactory from "session-file-store";
import { inertia } from "jcc-express-mvc/Core/Inertia";
import appRoot from "app-root-path";

const rootPath = appRoot.path;

const FileStore = FileStoreFactory(session);

export class Kernel {
  //

  public middlewares = [
    morgan("dev"),
    cookieParser(),
    cors(),
    // session({
    //   secret: "ggggggg",
    //   resave: false,
    //   saveUninitialized: false,
    //   cookie: { maxAge: 60000 },
    // }),
    session({
      store: new FileStore({
        path: `${rootPath}/public/sessions`,
        retries: 1,
        ttl: 3600,
      }),
      secret: "dev-secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000,
      },
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
