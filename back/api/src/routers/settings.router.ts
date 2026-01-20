import { Router } from "express";
import { requireAuth } from "../middlewares/autentification.middleware.js";
import {
  getSettingsPage,
  updateUsername,
  updateEmailAddress,
  updatePassword,
} from "../controllers/settings.controller.js";

const router = Router();

// Router to get settings page
router.get("/", requireAuth, getSettingsPage);
// Router to put new username
router.put("/username", requireAuth, updateUsername);
// Router to put new e-mail address
router.put("/email", requireAuth, updateEmailAddress);
// Router to put new password
router.put("/password", requireAuth, updatePassword);

export default router;
