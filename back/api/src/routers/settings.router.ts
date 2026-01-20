import { Router } from "express";
import { requireAuth } from "../middlewares/autentification.middleware.js";
import {
  getSettingsPage,
  updateUsername,
  updateEmailAddress,
} from "../controllers/settings.controller.js";

const router = Router();

// Router to get settings page
router.get("/", requireAuth, getSettingsPage);
// Router to put new username
router.put("/username", requireAuth, updateUsername);
// Router to put new e-mail address
router.put("/email", requireAuth, updateEmailAddress);

export default router;
