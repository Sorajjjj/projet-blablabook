import { Router } from "express";
import { getParams } from "../controllers/params.controller.js";
import { requireAuth } from "../middlewares/autentification.middleware.js";

const router = Router();

router.get("/params", requireAuth, getParams);

export default router;
