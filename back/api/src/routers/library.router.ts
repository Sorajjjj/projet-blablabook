import { Router } from "express";
import { addBooktoLibrary, deleteBookLibrary, getMyLibrary, updateBookLibraryStatus } from "../controllers/libraries.controller.js"
import { requireAuth } from "../middlewares/autentification.middleware.js";

const router = Router();

router.get('/', requireAuth, getMyLibrary);
router.post('/', requireAuth, addBooktoLibrary);
router.delete('/:bookId', requireAuth, deleteBookLibrary);
router.patch('/:bookId/status', requireAuth, updateBookLibraryStatus);

export default router;