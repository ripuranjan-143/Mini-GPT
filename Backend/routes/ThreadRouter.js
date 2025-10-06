import express from 'express';
import WrapAsync from '../utils/WrapAsync.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';
import threadController from '../controllers/ThreadController.js';
import validateSchema from '../utils/ValidateSchema.js';
import Schema from '../utils/Schema.js';

const threadRouter = express.Router();

threadRouter.get('/all', AuthMiddleware.verifyToken, WrapAsync(threadController.getAllThreads));
threadRouter.get(
  '/:threadId',
  AuthMiddleware.verifyToken,
  validateSchema(Schema.getThreadIdSchema),
  WrapAsync(threadController.getThreadById)
);
threadRouter.delete(
  '/:threadId',
  AuthMiddleware.verifyToken,
  validateSchema(Schema.deleteThreadIdSchema),
  WrapAsync(threadController.deleteThreadById)
);

export default threadRouter;
