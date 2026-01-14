import { Router } from "express";
import { addBooktoLibrary, getMyLibrary } from "../controllers/libraries.controller.js"

const router = Router();

// Temporary: using dynamic params for now.
// This will be replaced later by user data from authentication (token).
router.get('/user/:id', getMyLibrary);
router.post('/user/:id', addBooktoLibrary);


export default router;