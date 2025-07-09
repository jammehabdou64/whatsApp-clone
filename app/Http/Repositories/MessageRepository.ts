import { Message } from "@/Model/Message";
import { Request } from "jcc-express-mvc";

export class MessageRepository {
  async getChatMessage(req: Request) {
    const selectedUserId = req.params.id;
    const authId = req.user?.id;

    return Message.where("sender_id", selectedUserId)
      .where("recepient_id", authId)
      .orWhere("sender_id", authId)
      .where("recepient_id", selectedUserId)
      .get();
  }
}
