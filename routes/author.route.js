import express from 'express';
import authorController from '../controllers/authorController.js';

const router = express.Router();

/* Get All Authors */
router.get('/', authorController.getAllAuthors);

/* Get Author */
router.get('/:id', authorController.getAuthor);

/* Add Author */
router.post('/', authorController.addAuthor);

/* Update Author */
router.put('/:id', authorController.updateAuthor);

/* Delete Author */
router.delete('/:id', authorController.deleteAuthor);

export default router;
