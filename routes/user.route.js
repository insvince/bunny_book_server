import express from 'express';
import userController from '../controllers/userController.js';
import middleware from '../controllers/middleware.js';

const router = express.Router();

/* Get All Users */
router.get('/', middleware.verifyTokenIsAdmin, userController.getAllUsers);

/* Update User */
router.put('/:id', middleware.verifyTokenAdminAuth, userController.updateUser);

/* Delete User */
router.delete(
    '/:id',
    middleware.verifyTokenAdminAuth,
    userController.deleteUser,
);

export default router;
