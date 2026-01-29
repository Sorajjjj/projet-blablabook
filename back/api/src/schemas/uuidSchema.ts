import z from "zod";

export const paramsSchema = z.object({
  id: z.string().uuid(),
});

export type ParamsSchema = z.infer<typeof paramsSchema>;