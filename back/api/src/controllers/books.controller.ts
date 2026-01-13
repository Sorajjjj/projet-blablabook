import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.ts";

export const getAllBooks = async (req: Request, res: Response) => {

  try {
    const books = await prisma.books.findMany();
    res.json(books);
  }
  catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres.", error});
  }

}