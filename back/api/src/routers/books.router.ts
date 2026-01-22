import { Router } from "express";
import {
  getAllBooks,
  getRandomBooks,
  getById,
  searchBook,
} from "../controllers/books.controller.js";

const router = Router();

router.get("/search", searchBook);

// Endpoint to get all books
router.get("/", getAllBooks);

// Endpoint to get 5 random books
router.get("/random", getRandomBooks);

// Endpoint to get a book by id
router.get("/:bookId", getById);

export default router;
