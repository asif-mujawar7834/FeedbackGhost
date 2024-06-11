import { z } from "zod";
import { userNameValidation } from "./signUpSchema";

export const messageSchema = z.object({
  content: z
    .string({ message: "Message content required to send messages." })
    .min(10, { message: "Content must be atleast 10 characters" })
    .max(300, { message: "Content must be no longer than 300 characters" }),

  username: userNameValidation,
});
