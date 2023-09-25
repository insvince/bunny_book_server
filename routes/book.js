import express from 'express';
import bookController from './../controllers/book.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
