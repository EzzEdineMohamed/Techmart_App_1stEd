// schemas/LoginSchema.ts
import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("please enter your email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please enter valid email"
    ),

  password: z
    .string()
    .nonempty("please enter your password")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
      "enter valid password"
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
