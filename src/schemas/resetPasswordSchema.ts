import { z } from "zod";
import { passwordValidation } from "./signUpSchema";

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Specify which field the error should be associated with
  });
