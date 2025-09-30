import express from 'express';
import userRouter from './UserRouter.js';
import chatRouter from './ChatRouter.js';
import threadRouter from './ThreadRouter.js';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/chat', chatRouter);
mainRouter.use('/thread', threadRouter);

export default mainRouter;
