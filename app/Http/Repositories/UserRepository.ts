import { Message } from "@/Model/Message";
import { User } from "@/Model/User";
import { Request } from "jcc-express-mvc";

export class UserRepository {
  async availableUsers(req: Request) {
    return User.select("id", "name", "slug", "avatar", "phone")
      .where("id", "!=", req.user?.id)
      .get();
  }

  async getUserChats(req: Request) {
    const rows = await Message.rawQuery(
      `
          SELECT MAX(id) as id
          FROM messages
          WHERE sender_id = ? OR recepient_id = ?
          GROUP BY LEAST(sender_id, recepient_id), GREATEST(sender_id, recepient_id)
        `,
      [req.user?.id, req.user?.id],
    );

    return Message.whereIn(
      "id",
      rows.map((row: any) => row?.id),
    )
      .with("sender", "recipient")
      .latest()
      .map((chat) => {
        if (chat?.sender_id == req?.user?.id) {
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
            message_is_sent: true,
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
          message_is_sent: true,
        };
      });
  }
}
