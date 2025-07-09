import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { bcrypt, Request } from "jcc-express-mvc";
import { User } from "@/Model/User";

export class AuthRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      name: ["required"],
      phone: ["required", "unique:users"],
      password: ["required", "min:6"],
    });
  }

  async save() {
    await this.rules();
    const { name, phone, password } = await this.validated();
    console.log({ name, phone, password });
    return User.create({
      phone,
      name,
      password: await bcrypt(password),
      last_seen: new Date(),
    });
  }
}
