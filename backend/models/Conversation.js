import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  messages: [
    {
      id: String,
      text: String,
      isUser: Boolean,
      timestamp: String,
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
