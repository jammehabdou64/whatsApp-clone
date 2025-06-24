import { Application } from "jcc-express-mvc/Core";

import { providers } from "./providers";
import { Kernel } from "../app/Http/kernel";

const app = Application.configuration()
  .withRouting([
    {
      name: "routes/api",
      prefix: "/api",
    },
    {
      name: "routes/web",
      prefix: "",
    },
  ])
  .withProviders(providers)
  .withKernel(Kernel)
  .withMiddleware()
  .create();

export { app };
