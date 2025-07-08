import { Application } from "jcc-express-mvc/Core";
import { SocketProvider } from "jcc-express-mvc/Core/Provider";
import { SocketType } from "jcc-express-mvc/Core/Socket";

export class SocketIOServiceProvider extends SocketProvider {
  //
  constructor(protected app: Application) {
    super(app);
  }

  register(): void {}

  boot(): void {
    this.on("connection", (socket: SocketType) => {
      socket.on("message", (data) => {
        console.log("Received message:", data);
        socket.broadcast.emit("message", data); // Broadcast to others
      });
    });
  }
}
