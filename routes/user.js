import express from 'express';
import middleware from '../controllers/middleware.js';
import userController from '../controllers/user.js';

const router = express.Router();

/* Get All Users */
router.get('/', middleware.verifyToken, userController.getAllUsers);

/* Get User */
// router.get('/:id', userController.getUser);

/* Register User */
router.post('/register', userController.registerUser);

/* Login User */
router.post('/login', userController.loginUser);

/* Logout User */
router.post('/logout', middleware.verifyToken, userController.logoutUser);

/* Update User */

/* Refresh Token */
router.post('/refresh', userController.requestRefreshToken);

/* Delete User */
router.delete(
    '/:id',
    middleware.verifyTokenAdminAuth,
    userController.deleteUser,
);

export default router;
