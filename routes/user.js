import express from 'express';
import userController from '../controllers/user.js';
import middleware from '../controllers/middleware.js';

const router = Router.express();

router.delete(
    '/:id',
    middleware.verifyTokenAdminAuth,
    authController.deleteUser,
);

export default router;
