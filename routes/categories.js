import express from 'express';
import categoryController from './../controllers/categories.js';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
