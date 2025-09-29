import Thread from '../models/ThreadModel.js';
import User from '../models/UserModel.js';
import getAIResponse from '../utils/OpenAi.js';
import ExpressError from '../utils/ExpressError.js'

const chat = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ExpressError(401, 'User not found or deleted');
  }
  const { threadId, message } = req.body;
  let thread = await Thread.findOne({
    threadId,
    userId: req.user.id,
  });
  if (!thread) {
    thread = new Thread({
      threadId,
      title: message,
      messages: [{ role: 'user', content: message }],
      userId: req.user.id,
    });
    await thread.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { allthreads: thread._id },
    });
  } else {
    thread.messages.push({ role: 'user', content: message });
  }
  const assistantReply = await getAIResponse(message);
  thread.messages.push({
    role: 'assistant',
    content: assistantReply,
  });
  await thread.save();
  return res.json({ reply: assistantReply });
};

export default { chat };
