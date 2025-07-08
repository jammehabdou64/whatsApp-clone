import { User } from "@/Model/User";
import { Inject } from "jcc-express-mvc/Core/Dependency";
import { Request, Response, Next } from "jcc-express-mvc";
import { UserRepository } from "../Repositories/UserRepository";

@Inject()
export class HomeController {
  constructor(private user: UserRepository) {}
  /**
   *@access public
   * @return  Express Request Response
   */
  async create(req: Request, res: Response, next: Next) {
    //
  }
  /**
   *@access public
   * @return  Express Request Response
   */
  async index(req: Request, res: Response, next: Next) {
    //
    const [availableUsers, chats] = await Promise.all([
      this.user.availableUsers(req),
      this.user.getUserChats(req),
    ]);
    return res.inertia("Index", {
      user: req.user,
      availableUsers,
      chats,
    });
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store(req: Request, res: Response, next: Next) {
    //
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
