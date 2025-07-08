import { Chat } from "@/Model/Chat";
import { Message } from "@/Model/Message";
import { Request, Response, Next } from "jcc-express-mvc";
import { QueryBuilder as Builder } from "jcc-eloquent/src/QueryBuilder";

export class MessagesController {
  /**
   *@access public
   * @return  Express Request Response
   */
  async create(req: Request, res: Response, next: Next) {
    //
    // const rows = await Message.rawQuery(
    //   `
    //   SELECT MAX(id) as id
    //   FROM messages
    //   WHERE sender_id = ? OR recepient_id = ?
    //   GROUP BY LEAST(sender_id, recepient_id), GREATEST(sender_id, recepient_id)
    // `,
    //   [2, 2],
    // );

    // const messages = await Message.whereIn(
    //   "id",
    //   rows.map((row: any) => row?.id),
    // )
    //   .with("sender", "recipient")
    //   .latest()
    //   .map((chat) => {
    //     // return chat;
    //     if (chat?.sender_id == "1") {
    //       return {
    //         id: chat?.recipient_id,
    //         name: chat?.recipient?.name,
    //         avatar: chat?.recipient?.avatar,
    //         slug: chat?.recipient?.slug,
    //         last_seen: chat?.recipient?.last_seen,
    //         status: chat?.recipient?.status,
    //         message_body: chat?.body,
    //         message_read: chat?.read,
    //         message_type: chat?.type,
    //         message_media_url: chat?.media_url,
    //         message_created_at: chat?.created_at,
    //         message_is_sent: true,
    //       };
    //     }
    //     return {
    //       id: chat?.sender_id,
    //       name: chat?.sender?.name,
    //       avatar: chat?.sender?.avatar,
    //       slug: chat?.sender?.slug,
    //       last_seen: chat?.sender?.last_seen,
    //       status: chat?.sender?.status,
    //       message_body: chat?.body,
    //       message_read: chat?.read,
    //       message_type: chat?.type,
    //       message_media_url: chat?.media_url,
    //       message_created_at: chat?.created_at,
    //       message_is_sent: true,
    //     };
    //   });

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
  async index(req: Request, res: Response, next: Next) {
    //
    const rows = await Message.rawQuery(
      `
      SELECT MAX(id) as id
      FROM messages
      WHERE sender_id = ? OR recepient_id = ?
      GROUP BY LEAST(sender_id, recepient_id), GREATEST(sender_id, recepient_id)
    `,
      [req.user?.id, req.user?.id],
    );

    const messages = await Message.whereIn(
      "id",
      rows.map((row: any) => row?.id),
    )
      .with("sender", "recipient")
      .latest()
      .map((chat) => {
        if (chat?.sender_id == req.user?.id) {
          return {
            id: chat?.recepient_id,
            name: chat?.recipient?.name,
            avatar: chat?.recipient?.avatar,
            slug: chat?.recipient?.slug,
            last_seen: chat?.recipient?.last_seen,
            status: chat?.recipient?.status,
            message_body: chat?.body,
            message_read: chat?.read,
            message_type: chat?.type,
            message_media_url: chat?.media_url,
            message_created_at: chat?.created_at,
          };
        }
        return {
          id: chat?.sender_id,
          name: chat?.sender?.name,
          avatar: chat?.sender?.avatar,
          slug: chat?.sender?.slug,
          last_seen: chat?.sender?.last_seen,
          status: chat?.sender?.status,
          message_body: chat?.body,
          message_read: chat?.read,
          message_type: chat?.type,
          message_media_url: chat?.media_url,
          message_created_at: chat?.created_at,
        };
      });

    return res.json({
      mesage: messages,
    });
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store(req: Request, res: Response, next: Next) {
    const { message, recepient_id } = req.body;
    //

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
    const selectedUserId = req.params.id;
    const authId = req.user?.id;

    const messages = await Message.where("sender_id", selectedUserId)
      .where("recepient_id", authId)
      .orWhere("sender_id", authId)
      .where("recepient_id", selectedUserId)
      .get();
    return res.json({ message: messages, success: true });
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
