import Thread from '../models/ThreadModel.js';
import ExpressError from '../utils/ExpressError.js';
import User from '../models/UserModel.js';

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

async function deleteThreadById(req, res) {
  const { threadId } = req.params;
  const deletedThread = await Thread.findOneAndDelete({
    threadId,
    userId: req.user.id,
  });
  if (!deletedThread) {
    throw new ExpressError(404, 'Thread not found')
  }
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { allthreads: deletedThread._id },
  });
  res.status(200).json({ success: 'Thread deleted successfully' });
}

export default { getAllThreads, getThreadById, deleteThreadById };
