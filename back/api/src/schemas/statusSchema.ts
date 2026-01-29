import z from "zod";

export const newStatusSchema = z.object({

  
  status: z.enum(["A lire", "En cours", "Lu"]),
  
});