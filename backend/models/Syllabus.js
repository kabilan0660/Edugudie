import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
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
  topics: [
    {
      id: String,
      title: String,
      duration: Number,
      notes: String,
      conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

export default Syllabus;
