import z from "zod";

export const newBookToLibrarySchema = z.object({
  // Book fields
  bookId: z.string().uuid(),
  status: z.enum(["A lire", "En cours", "Lu"]),
});