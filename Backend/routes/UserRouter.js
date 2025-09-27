import express from 'express';
import userController from '../controllers/UserController.js';
import WrapAsync from '../utils/WrapAsync.js';

const userRouter = express.Router();

userRouter.get('/test', WrapAsync(userController.test));
userRouter.post('/signup', WrapAsync(userController.signup));

export default userRouter;
