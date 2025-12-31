import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(3, "enter at least 3 characters for the name"),

    email: z
      .string()
      .nonempty("enter your email")
      .email("enter a valid email address"),

    password: z
      .string()
      .nonempty("enter your password")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password must be 8 characters, uppercase, lowercase, number, and symbol"
      ),

    confirmPassword: z.string().nonempty("confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
