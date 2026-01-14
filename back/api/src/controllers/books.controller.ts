import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";


// Retrieve all books from the database
export const getAllBooks = async (req: Request, res: Response) => {

  try {
    const books = await prisma.book.findMany();
    res.json(books);
  }
  catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres.", error});
  }

}

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
  }
  catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres.", error});
  } 
}
