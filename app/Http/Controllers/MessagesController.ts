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
    const rows = await Message.rawQuery(
      `
      SELECT MAX(id) as id
      FROM messages
      WHERE sender_id = ? OR recepient_id = ?
      GROUP BY LEAST(sender_id, recepient_id), GREATEST(sender_id, recepient_id)
    `,
      [1, 1],
    );

    const messages = await Message.whereIn(
      "id",
      rows.map((row: any) => row?.id),
    )
      .with("sender", "recipient")
      .latest()
      .map((chat) => {
        if (chat?.sender_id == "1") {
          return {
            id: chat?.recipient_id,
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

    return res.json({ msg: messages });
  }
  /**
   *@access public
   * @return  Express Request Response
   */
  async index(req: Request, res: Response, next: Next) {
    //

    return res.json({
      mesage: await Chat.select("id", "created_by", "recepient_id")
        .where("created_by", 1)
        .orWhere("recepient_id", 1)
        .with({
          messages(query: typeof Builder) {
            query.with(
              {
                sender(q: typeof Builder) {
                  q.select(
                    "id",
                    "name",
                    "avatar",
                    "phone",
                    "status",
                    "created_at",
                  );
                },
              },
              {
                recipient(query: typeof Builder) {
                  query.select(
                    "id",
                    "name",
                    "avatar",
                    "phone",
                    "status",
                    "created_at",
                  );
                },
              },
            );
          },
        })
        .get(),
    });
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store(req: Request, res: Response, next: Next) {
    const { message, chatId, created_by, recepient_id } = req.body;
    //
    let chat = (await Chat.find(chatId)) as any;
    if (!chat) {
      chat = await Chat.create({
        created_by: req.user?.id,
        recepient_id,
        chat_type: "private",
      });
    }

    const save = await Message.create({
      sender_id: req.user?.id,
      recepient_id,
      chat_id: chat?.id,
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
