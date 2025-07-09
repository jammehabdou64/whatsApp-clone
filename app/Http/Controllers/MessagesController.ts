import { Chat } from "@/Model/Chat";
import { Message } from "@/Model/Message";
import { Request, Response, Next } from "jcc-express-mvc";
import { QueryBuilder as Builder } from "jcc-eloquent/src/QueryBuilder";
import { MessageRepository } from "../Repositories/MessageRepository";
import { Inject } from "jcc-express-mvc/lib/Dependancy";

@Inject()
export class MessagesController {
  constructor(private message: MessageRepository) {}
  /**
   *@access public
   * @return  Express Request Response
   */
  async create(req: Request, res: Response, next: Next) {
    const messages = await Message.where("sender_id", 1)
      .where("recepient_id", 2)
      .orWhere("sender_id", 2)
      .where("recepient_id", 1)
      .get();
    return res.json({ msg: messages });
  }
  /**
   *@access public
   * @return  Express Request Response
   */
  async index(req: Request, res: Response, next: Next) {}

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store(req: Request, res: Response, next: Next) {
    const { message, recepient_id } = req.body;
    const save = await Message.create({
      sender_id: req.user?.id,
      recepient_id,
      chat_id: "12",
      body: message,
      type: "text",
    });
    if (save) {
      return res.inertiaRedirect("/");
    }
    return res.inertiaRedirect("/", "sorry an error occur");
  }

  /**
   *@access public
   *@param {id} - string
   * @return Express Request Response
   */
  async show(req: Request, res: Response, next: Next) {
    //
    // const selectedUserId = req.params.id;
    // const authId = req.user?.id;

    // const messages = await Message.where("sender_id", selectedUserId)
    //   .where("recepient_id", authId)
    //   .orWhere("sender_id", authId)
    //   .where("recepient_id", selectedUserId)
    //   .get();
    return res.json({
      message: await this.message.getChatMessage(req),
      success: true,
    });
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

  //
  private normalizePair(a: number, b: number): string {
    return a < b ? `${a}_${b}` : `${b}_${a}`;
  }
}
