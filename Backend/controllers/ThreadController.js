import Thread from '../models/ThreadModel.js';

const getAllThreads = async (req, res) => {
  const threads = await Thread.find({ userId: req.user.id }).sort({
    updatedAt: -1,
  });
  res.json(threads);
};

export default { getAllThreads };
