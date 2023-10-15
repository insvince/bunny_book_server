import express from 'express';
import bookController from '../controllers/book.js';

const router = express.Router();

/* Get All Books */
router.get('/', bookController.getAllBooks);

/* Get Book */
router.get('/:id', bookController.getBook);

/* Add Book */
router.post('/', bookController.addBook);

/* Update Book */
router.put('/:id', bookController.updateBook);

/* Delete Book */
router.delete('/:id', bookController.deleteBook);

export default router;
