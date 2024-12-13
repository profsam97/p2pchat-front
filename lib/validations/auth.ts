import * as z from "zod";

export const signUpSchema = z.object({
  fullname: z.string().min(4, "Name must be at least 4 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Phone number must be at least 10 digits"),
});


export const loginSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
});



export type SignUpValues = z.infer<typeof signUpSchema>;

export type loginValues = z.infer<typeof loginSchema>;