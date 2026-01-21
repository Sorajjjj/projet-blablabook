import z from "zod";

export const updateUsernameSchema = z.object({
  username: z.string().min(2).max(50),
});

export const updateEmailSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8),
});
