// Import express modules
import express from "express";
// Import function from controller
import { getHomePage } from "../controllers/home.controller.ts";

// Create router instance
const router = express.Router();

// Define route to get home page
router.get("/", getHomePage);

// Export router
export default router;
