import express from 'express';
import cartController from '../controllers/cart.js';
import middleware from '../controllers/middleware.js';

const router = express.Router();

/* Get All Item */
router.get('/', middleware.verifyToken, cartController.getAllItems);

/* Add Cart  */
router.put('/:id', middleware.verifyToken, cartController.updateCart);

export default router;
