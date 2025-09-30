import Thread from '../models/ThreadModel.js';
import ExpressError from '../utils/ExpressError.js';

const getAllThreads = async (req, res) => {
  const threads = await Thread.find({ userId: req.user.id }).sort({
    updatedAt: -1,
  });
  res.json(threads);
};

const getThreadById = async (req, res) => {
  const { threadId } = req.params;
  const thread = await Thread.findOne({ threadId: threadId, userId: req.user.id });
  if (!thread) {
    throw new ExpressError(404, 'Thread not found');
  }
  res.json(thread.messages);
};

export default { getAllThreads, getThreadById };
