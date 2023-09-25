import authController from '../controllers/auth.js';
import express from 'express';

const router = express.Router();

router.get('/', authController.getAllAuthors);
router.get('/:id', authController.getAuthor);
router.post('/', authController.addAuthor);
router.put('/:id', authController.updateAuthor);
router.delete('/:id', authController.deleteAuthor);

export default router;
