import express from 'express';
import categoryController from '../controllers/genresController.js';

const router = express.Router();

/* Get All Categories */
router.get('/', categoryController.getAllCategories);

/* Get Category */
router.get('/:id', categoryController.getCategory);

/* Add Category */
router.post('/', categoryController.addCategory);

/* Update Category */
router.put('/:id', categoryController.updateCategory);

/* Delete Category */
router.delete('/:id', categoryController.deleteCategory);

export default router;
