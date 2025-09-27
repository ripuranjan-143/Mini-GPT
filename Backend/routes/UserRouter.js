import express from 'express';
import userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/test', userController.test);
userRouter.get('/signup', userController.signup);

export default userRouter;
