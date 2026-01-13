import { Router } from "express";
import { getAllBooks, getRandomBooks } from "../controllers/books.controller.js";

const router = Router();

// Endpoint to get all books
router.get('/', getAllBooks);

// Endpoint to get 5 random books
router.get('/random', getRandomBooks);

export default router;