import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
// Import zod
import z from "zod";
// Import http errors handler
import { NotFoundError } from "../lib/errors.js";

// Retrieve all books from the database
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des livres.", error });
  }
};

// Get 5 books randomly
export const getRandomBooks = async (req: Request, res: Response) => {
  try {
    // Retrieve all books
    const allBooks = await prisma.book.findMany();

    // Shuffle the array randomly
    const shuffled = allBooks.sort(() => Math.random() - 0.5);

    // Take the first 5
    const books = shuffled.slice(0, 5);

    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des livres.", error });
  }
};

// Get a book by id
export async function getById(req: Request, res: Response) {
  // get id and verify data
  const bookId = z.coerce.number().min(1).parse(req.params.id);

  // If id does not exists, send 404
  if (!bookId) {
    throw new NotFoundError("Cet id n'existe pas");
  }

  // Get book by this verified id
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  // If book does not exists, send 404
  if (!book) {
    throw new NotFoundError("Ce livre n'existe pas");
  }

  res.status(200).json(book);
}
