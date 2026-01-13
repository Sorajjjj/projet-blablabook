import { Router } from "express";
import { healthCheck } from "../controllers/main.controller.js"
import booksRouter from "./books.router.js";

export const router = Router();

router.get("/health", healthCheck);
router.use('/books', booksRouter);