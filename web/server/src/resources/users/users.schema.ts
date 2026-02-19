import { z } from "zod";

export const IdSchema = z.string().min(1, "Id is required");

export const PaginationParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export const ContactInfoSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

export const UserRoleSchema = z.enum(["admin", "user"]);

export const UserSchema = z.object({
  id: IdSchema,
  name: z.string().min(1, "Name is required"),
  role: UserRoleSchema,
  contactInfo: ContactInfoSchema,
  preferredLanguage: z.string().min(1).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateUserPayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: UserRoleSchema,
  contactInfo: ContactInfoSchema,
  preferredLanguage: z.string().min(1).optional(),
});

export const UpdateUserPayloadSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  role: UserRoleSchema.optional(),
  contactInfo: ContactInfoSchema.optional(),
  preferredLanguage: z.string().min(1).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type ContactInfo = z.infer<typeof ContactInfoSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserPayloadSchema>;
