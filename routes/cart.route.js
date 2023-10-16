import express from 'express';
import cartController from '../controllers/cartController.js';
import middleware from '../controllers/middleware.js';

const router = express.Router();

/* Get All Item */
router.get('/', middleware.verifyToken, cartController.getAllItems);

/* Clear Cart */
router.put('/clear', middleware.verifyToken, cartController.clearCart);

/* Add Item  */
router.put('/:id', middleware.verifyToken, cartController.updateCart);

/* Delete Item */
router.delete('/:id', middleware.verifyToken, cartController.deleteItem);

/* Update quatity */

export default router;
