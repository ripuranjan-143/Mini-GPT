import express from 'express';
import userController from '../controllers/UserController.js';
import WrapAsync from '../utils/WrapAsync.js';
import validateSchema from '../utils/ValidateSchema.js';
import Schema from '../utils/Schema.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.get('/test', WrapAsync(userController.test));
userRouter.post('/signup', validateSchema(Schema.signupSchema), WrapAsync(userController.signup));
userRouter.post('/login', validateSchema(Schema.loginSchema), WrapAsync(userController.login));
userRouter.get(
  '/:id',
  AuthMiddleware.verifyToken,
  validateSchema(Schema.userIdSchema),
  WrapAsync(userController.getUserById)
);

export default userRouter;
