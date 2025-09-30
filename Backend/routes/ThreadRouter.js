import express from 'express';
import WrapAsync from '../utils/WrapAsync.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';
import threadController from '../controllers/ThreadController.js';

const threadRouter = express.Router();

threadRouter.get(
  '/all',
  AuthMiddleware.verifyToken,
  WrapAsync(threadController.getAllThreads)
);

export default threadRouter;
