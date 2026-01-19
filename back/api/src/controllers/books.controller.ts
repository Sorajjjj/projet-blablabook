import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
// Import zod
import z, { includes } from "zod";
// Import http errors handler
import { NotFoundError } from "../lib/errors.js";

// Retrieve all books from the database
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true
      }
    });
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
    const allBooks = await prisma.book.findMany({
      include: {
        author: true
      }
    });

    // Shuffle the array randomly
    const shuffled = allBooks.sort(() => Math.random() - 0.5);

    // Take the first 4
    const books = shuffled.slice(0, 4);

    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des livres.", error });
  }
};

// Get a book by id
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    // Get id from request params
    const { bookId } = req.params;

    // Validate UUID
    const uuidValidation = z.string().uuid().safeParse(bookId);

    // If it is not valid
    if (!uuidValidation.success) {
      throw new NotFoundError("Id invalide");
    }

    // Use id to get book
    const book = await prisma.book.findUnique({
      where: {
        bookId,
      },
      include: {
        author: true
      }
    });

    // If book does not exists, send 404
    if (!book) {
      throw new NotFoundError("Ce livre n'existe pas");
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}
