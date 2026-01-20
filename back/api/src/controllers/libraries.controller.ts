import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { paramsSchema } from "../schemas/uuidSchema.js"
import { newBookToLibrarySchema } from "../schemas/newbookschema.js";
import { newStatusSchema } from "../schemas/statusSchema.js";

export const getMyLibrary = async (req:Request, res:Response) =>{

    // Get the user id from the auth middleware
    const id = req.userId;

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
    .json({message:"La bibliothèque de l’utilisateur est vide.", data:[]})
    }

    // Return the user's library with status 200
    return res
    .status(200)
    .json({message:"Données de la bibliothèque de l’utilisateur", data: library})

}

export const addBooktoLibrary = async (req:Request, res:Response) =>{

    // Get the user id from the auth middleware
    const id = req.userId;
    
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
        return res.status(404).json({ message: "Livre non trouvé" });
    }
   

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
        where: {userId: id},
    })

    if(!existingUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Check if the book is already in the user's library
    const library = await prisma.userLibrary.findFirst({
        where: {
            userId: id,
            bookId: bookId
        }
    })

    if (library) {
        return res.status(409).json({ message: "Le livre est déjà dans la bibliothèque." });
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
    return res.status(201).json({message: "Livre ajouté a la bibliothèque", data: newBook})

}

export const deleteBookLibrary = async (req: Request, res: Response) => {

    // Get the user id from the auth middleware
    const id = req.userId;

  // Get book id from params
  const { bookId } = req.params;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { userId: id },
  });

  if (!existingUser) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  // Check if the book is in the user's library
  const existingEntry = await prisma.userLibrary.findFirst({
    where: {
      userId: id,
      bookId: bookId,
    },
  });

  if (!existingEntry) {
    return res.status(404).json({ message: "Livre non trouvé dans la bibliothèque" });
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
    message: "Livre retiré de la bibliothèque"
  });
};

export const updateBookLibraryStatus = async (req: Request, res: Response) => {

    const userId = req.userId;

    const { bookId } = req.params;

    const { status } = newStatusSchema.parse(req.body);

    // check user exists
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // check entry exists
    const existingEntry = await prisma.userLibrary.findFirst({
      where: { userId, bookId },
    });
    if (!existingEntry) {
      return res.status(404).json({ message: "Livre non trouvé dans la bibliothèque" });
    }

    // update entry
    const updated = await prisma.userLibrary.update({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      data: {
        status,
      },
    });

    
    return res.status(200).json({
      message: "Status mis à jour",
      data: updated,
    });
  
};
