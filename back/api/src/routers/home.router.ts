// Import express modules
import express from "express";
// Import function from controller
import { getRandomBooks } from "../controllers/books.controller.ts";

// Create router instance
const router = express.Router();

// Define route to get home page
router.get("/", getRandomBooks);

// Export router
export default router;
