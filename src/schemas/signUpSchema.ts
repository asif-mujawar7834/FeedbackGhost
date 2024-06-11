import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9_-]{2,20}$/,
    "Username should not contain special characters"
  );

export const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one digit" })
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character",
  });

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name cannot be empty")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name cannot be empty")
    .max(50, "Last name is too long")
    .optional(),
  profileImageUrl: z.string().url("Invalid URL format").optional(),
  username: userNameValidation,
  email: z.string().email({ message: "Email must be valid" }),
  password: passwordValidation,
});
