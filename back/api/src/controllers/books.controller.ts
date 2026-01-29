import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
// Import zod
import z, { includes } from "zod";
// Import http errors handler
import { NotFoundError } from "../lib/errors.js";
import { bookSearchSchema } from "../schemas/seachSchema.js";

interface BookWithRelations {
  bookId: string;
  title: string;
  // ... autres champs
  author?: {
    fullName: string;
  };
  libraries?: Array<{
    userId: string;
    bookId: string;
    status: string;
  }> | false; 
}

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

// Get 15 books randomly
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

    // Take the first 15
    const books = shuffled.slice(0, 15);

    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des livres.", error });
  }
};

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    // Get id from request params
    const { bookId } = req.params;

    const userId = req.userId;

    // Validate UUID
    const uuidValidation = z.string().uuid().safeParse(bookId);

    // If it is not valid
    if (!uuidValidation.success) {
      throw new NotFoundError("Id invalide");
    }

    // Use id to get book
    const book = await prisma.book.findUnique({
      where: { bookId },
      include: {
        author: true,
        // Only fetch library data if userId exists, otherwise returns false
        libraries: userId ? { where: { userId } } : false
      }
    }) as BookWithRelations;

    // If book does not exists, send 404
    if (!book) {
      throw new NotFoundError("Ce livre n'existe pas");
    }

    const userLibraryEntry = Array.isArray(book.libraries) ? book.libraries[0] : null;
    
    // Prepare response with a safety check
    const bookResponse = {
      ...book,
      // true if token was valid and userId found
      isLogged: !!userId,
      // Check if libraries exists as an array before checking its length
      // This prevents crashes for unauthenticated users
      isInLibrary: Array.isArray((book as any).libraries) && (book as any).libraries.length > 0,
      bookStatus: userLibraryEntry ? userLibraryEntry.status : null
    };

    res.status(200).json(bookResponse);
  } catch (error) {
    next(error);
  }
}

export async function searchBook(req: Request, res: Response) {

  const search = req.query.q

  const q = typeof search === "string" ? search : "";

  const searchValid = bookSearchSchema.safeParse({ q })

  if (!searchValid.success) {
    return res.status(200).json([])
  }

  const qValidated = searchValid.data.q

  const booksSearched = await prisma.book.findMany({
    where: {
      title: {
        contains: qValidated,
        mode: "insensitive",
      },
    },
    take: 5,
    select: {
      bookId: true,
      title: true
    },
  });

  return res.status(200).json(booksSearched);
}

