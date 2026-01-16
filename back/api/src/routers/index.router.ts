import { Router } from "express";
import { healthCheck } from "../controllers/main.controller.js";
import  librariesRouter  from "./library.router.js";
import booksRouter from "./books.router.js";
import authRouter from "./auth.router.js";
// Import home router
import homeRouter from "./home.router.js";

export const router = Router();

router.get("/health", healthCheck);

// Use router to get home page
router.use("/", homeRouter);

router.use('/books', booksRouter);

router.use("/libraries", librariesRouter);

router.use("/auth", authRouter);
