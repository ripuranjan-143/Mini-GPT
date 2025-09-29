import express from 'express';
import WrapAsync from '../utils/WrapAsync.js';
import ChatController from '../controllers/ChatController.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';
import validateSchema from '../utils/ValidateSchema.js';
import Schema from '../utils/Schema.js';

const chatRouter = express.Router();

chatRouter.post(
  '/',
  AuthMiddleware.verifyToken,
  validateSchema(Schema.chatSchema),
  WrapAsync(ChatController.chat)
);

export default chatRouter;
