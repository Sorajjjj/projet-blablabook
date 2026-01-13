import { Router } from "express";
import { healthCheck } from "../controllers/main.controller.js";
// Import home router
import homeRouter from "./home.router.js";

export const router = Router();

router.get("/health", healthCheck);

// Use router to get home page
router.use("/", homeRouter);
