import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ThreadSchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      default: uuidv4,
    },
    title: {
      type: String,
      default: 'New Chat',
    },
    messages: [MessageSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Thread', ThreadSchema);
