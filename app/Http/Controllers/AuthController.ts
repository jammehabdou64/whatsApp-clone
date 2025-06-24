import { User } from "@/Model/User";
import { Request, Response, Next, bcrypt, Auth } from "jcc-express-mvc";

export class AuthController {
  /**
   *
   *@access public
   * @return Express Request Response
   */
  async register(req: Request, res: Response, next: Next) {
    //
    await req.validate({
      name: ["required"],
      email: ["required", "unique:users"],
      password: ["required", "min:6", "same:confirmPassword"],
      confirmPassword: ["same:password"],
    });

    const save = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt(req.body.password),
    });

    return save
      ? Auth.attempt(req, res, next)
      : res.json({ message: "Invalid credentials" });
  }

  /**
   *@access public
   *@param {id} - string
   * @return Express Request Response
   */
  async show(req: Request, res: Response, next: Next) {
    //
  }

  /**
   *
   *@access public
   * @param {id} - string
   * @return Express Request Response
   */
  async update(req: Request, res: Response, next: Next) {
    //
  }

  /**
   *@access public
   * @param  {id} - string
   * @return Express Response
   */
  async destroy(req: Request, res: Response, next: Next) {
    //
  }
}
