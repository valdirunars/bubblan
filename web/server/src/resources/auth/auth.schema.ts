import { z } from "zod";

export const SignInPayloadSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export const SignUpPayloadSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  redirectTo: z.string().url().optional(),
});

export type SignInPayload = z.infer<typeof SignInPayloadSchema>;
export type SignUpPayload = z.infer<typeof SignUpPayloadSchema>;
