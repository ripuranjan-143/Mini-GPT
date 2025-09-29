import express from 'express';
import userRouter from './UserRouter.js';
import chatRouter from './ChatRouter.js';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/chat', chatRouter);

export default mainRouter;
