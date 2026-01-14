import z from "zod";

export const newBookToLibrarySchema = z.object({
  // Book fields
  bookId: z.string().uuid(),
  title: z.string(),
  releaseDate: z.string().nullable(),
  isbn: z.string().nullable(),
  summary: z.string().nullable(),
  authorId: z.string().uuid(),

  // Library field
  status: z.enum(["want_to_read", "reading", "read"]),
});