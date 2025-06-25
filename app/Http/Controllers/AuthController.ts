import { User } from "@/Model/User";
import { AuthRequest } from "@/Request/AuthRequest";
import { Request, Response, Next, bcrypt, Auth } from "jcc-express-mvc";

export class AuthController {
  /**
   *
   *@access public
   * @return Express Request Response
   */
  async register(req: Request, res: Response, next: Next) {
    //
    const authRequest = new AuthRequest(req);
    const save = await authRequest.save();
    return save
      ? Auth.attempt(req, res, next, "/")
      : res.json({ message: "Invalid credentials" });
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async login(req: Request, res: Response, next: Next) {
    //
    return Auth.attempt(req, res, next, "/");
  }
}
