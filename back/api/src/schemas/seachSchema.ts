import z from "zod";

export const bookSearchSchema = z.object({
    q: z
    .string()
    .trim()
    .min(2)
    .max(50)
})