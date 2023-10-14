import express from 'express';
import middleware from '../controllers/middleware.js';
import authController from './../controllers/auth.js';

const router = express.Router();

/* Register User */
router.post('/register', authController.registerUser);

/* Login User */
router.post('/login', authController.loginUser);

/* Logout User */
router.post('/logout', middleware.verifyToken, authController.logoutUser);

/* Refresh Token */
router.post('/refresh', authController.requestRefreshToken);

export default router;
