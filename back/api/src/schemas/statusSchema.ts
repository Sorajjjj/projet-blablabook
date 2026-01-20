import z from "zod";

export const newStatusSchema = z.object({

  status: z.enum(["want_to_read", "reading", "read"]),
  
});