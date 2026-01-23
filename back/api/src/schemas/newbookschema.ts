import z from "zod";

export const newBookToLibrarySchema = z.object({
  // Book fields
  bookId: z.string().uuid(),
  status: z.enum(["want_to_read", "reading", "read"]),
});