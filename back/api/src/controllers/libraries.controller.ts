import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { paramsSchema } from "../schemas/uuidSchema.js"
import { newBookToLibrarySchema } from "../schemas/newbookschema.js";

export const getMyLibrary = async (req:Request, res:Response) =>{

    // Validate request params with Zod
    const { id } = paramsSchema.parse(req.params);

    // all books linked to this user
    const library = await prisma.userLibrary.findMany({
      where: { userId: id },
      include: { 
        book: {
            include: {
                author: true,
                genres: {
                    include: {
                        genre:true,
                    }
                }
            }
        }
       },
    });
    

    // If no data is found, return an empty list with status 200
    if(library.length === 0){
    return res
    .status(200)
    .json({message:"The user’s library is empty", data:{}})
    }

    // Return the user's library with status 200
    return res
    .status(200)
    .json({message:"User library data", data: library})

}

export const addBooktoLibrary = async (req:Request, res:Response) =>{

    // Get the user id from the request (later from token)
    const { id } = paramsSchema.parse(req.params);
    
    // Get book data from the request body
    const { 
    bookId, 
    title, 
    releaseDate, 
    isbn, 
    summary, 
    authorId, 
    status,} = newBookToLibrarySchema.parse(req.body);

    // Check if the book exists in the database
    const existingBook = await prisma.book.findUnique({
        where: {bookId: bookId}
    })

    if(!existingBook) {
        return res.status(404).json({ message: "Book not found" });
    }
   

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
        where: {userId: id},
    })

    if(!existingUser) {
        return res.status(404).json({ message: "user not found" });
    }

    // Check if the book is already in the user's library
    const library = await prisma.userLibrary.findFirst({
        where: {
            userId: id,
            bookId: bookId
        }
    })

    if (library) {
        return res.status(409).json({ message: "Book already in library" });
    }

    // Add the book to the user's library
    const newBook = await prisma.userLibrary.create({
        data: {
            userId: id,
            bookId, 
            status 
        }
    })

    // Send success response
    return res.status(201).json({message: "Book added to library", data: newBook})

}

export const deleteBookLibrary = async (req: Request, res: Response) => {

  // Get user id from params (later from token)
  const { id } = paramsSchema.parse(req.params);

  // Get book id from params
  const { bookId } = req.params;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { userId: id },
  });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the book is in the user's library
  const existingEntry = await prisma.userLibrary.findFirst({
    where: {
      userId: id,
      bookId: bookId,
    },
  });

  if (!existingEntry) {
    return res.status(404).json({ message: "Book not found in library" });
  }

  // Delete the entry
  await prisma.userLibrary.delete({
    where: {
      // if you have a composite key
      userId_bookId: {
        userId: id,
        bookId: bookId,
      },
    },
  });

  // Send response
  return res.status(200).json({
    message: "Book removed from library"
  });
};

