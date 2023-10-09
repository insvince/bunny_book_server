import authController from '../controllers/auth.js';
import express from 'express';

const router = express.Router();

/* Get All Authors */
router.get('/', authController.getAllAuthors);

/* Get Author */
router.get('/:id', authController.getAuthor);

/* Add Author */
router.post('/', authController.addAuthor);

/* Update Author */
router.put('/:id', authController.updateAuthor);

/* Delete Author */
router.delete('/:id', authController.deleteAuthor);

export default router;
