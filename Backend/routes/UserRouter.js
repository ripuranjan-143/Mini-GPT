import express from 'express';
import userController from '../controllers/UserController.js';
import WrapAsync from '../utils/WrapAsync.js';
import validateSchema from '../utils/ValidateSchema.js';
import Schema from '../utils/Schema.js';

const userRouter = express.Router();

userRouter.get('/test', WrapAsync(userController.test));
userRouter.post('/signup', validateSchema(Schema.signupSchema), WrapAsync(userController.signup));
userRouter.post('/login', validateSchema(Schema.loginSchema), WrapAsync(userController.login));

export default userRouter;
