import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from './models/User.js';
import Conversation from './models/Conversation.js';
import Syllabus from './models/Syllabus.js';

dotenv.config({ override: true });

// Initialize Gemini AI client using environment variable
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edugudie';
console.log('🛢️ Using MONGODB_URI:', MONGODB_URI);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get current user (for persistent login)
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Auth check error:', err);
    res.status(500).send('Server Error');
  }
});

// Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    // Return more specific error info for debugging
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', detail: error.message });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Conversation Routes

app.get('/api/conversations', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (err) {
    console.error('GET /api/conversations Error:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/conversations/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid conversation ID' });
    }

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (err) {
    console.error('GET /api/conversations/:id Error:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/conversations', auth, async (req, res) => {
  try {
    const { id, title, messages } = req.body;
    console.log(`Saving conversation: id=${id}, userId=${req.user.id}, msgCount=${messages?.length}`);

    let conversation;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      // Update existing
      conversation = await Conversation.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { $set: { messages, title, updatedAt: Date.now() } },
        { new: true }
      );
    } 

    if (!conversation) {
      // Create new
      console.log('Creating new conversation');
      conversation = new Conversation({
        userId: req.user.id,
        title: title || 'New Chat',
        messages
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    console.error('POST /api/conversations Error:', err);
    res.status(500).json({ message: 'Server Error saving conversation' });
  }
});

// DELETE Conversation
app.delete('/api/conversations/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid conversation ID' });
    }

    const result = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!result) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json({ message: 'Conversation deleted' });
  } catch (err) {
    console.error('DELETE /api/conversations/:id Error:', err);
    res.status(500).send('Server Error');
  }
});

// ─── AI ROUTES ──────────────────────────────────────────────────────────────

// POST /api/chat - Conversational AI (Gemini)
app.post('/api/chat', auth, async (req, res) => {
  if (!genAI) {
    return res.status(503).json({ message: 'AI service not configured. Add GEMINI_API_KEY to backend .env' });
  }

  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Convert history to Gemini chat format
    const geminiHistory = history.map(m => ({
      role: m.isUser ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const chat = model.startChat({ history: geminiHistory });
    const response = await chat.sendMessage(message);
    const reply = response?.response?.text?.() || response?.text?.() || '';
    res.json({ reply });
  } catch (err) {
    console.error('POST /api/chat Error:', err);
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});

// POST /api/syllabus/generate - AI Syllabus Analyzer (Gemini with JSON output)
app.post('/api/syllabus/generate', auth, async (req, res) => {
  if (!genAI) {
    return res.status(503).json({ message: 'AI service not configured. Add GEMINI_API_KEY to backend .env' });
  }

  try {
    const { syllabusText, title } = req.body;
    if (!syllabusText) {
      return res.status(400).json({ message: 'syllabusText is required' });
    }

    const prompt = `You are a study planner AI. Analyze the following syllabus content and break it into study topics.
For each topic, estimate a study duration in minutes (10-45) and provide concise notes.
Return ONLY valid JSON matching the schema.

Syllabus Title: "${title || 'My Syllabus'}"
Syllabus Content:
---
${syllabusText}
---`;

    const schema = {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING', description: 'Unique short ID like t1' },
          title: { type: 'STRING', description: 'Topic title' },
          duration: { type: 'INTEGER', description: 'Estimated minutes' },
          notes: { type: 'STRING', description: 'Concise study notes' },
        },
        required: ['id', 'title', 'duration', 'notes'],
      },
    };

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const response = await model.generateContent(prompt);
    const jsonText = response?.response?.text?.() || response?.text?.() || '';
    const topics = JSON.parse(jsonText);
    res.json({ topics });
  } catch (err) {
    console.error('POST /api/syllabus/generate Error:', err);
    res.status(500).json({ message: 'AI syllabus generation failed', error: err.message });
  }
});

// ─── SYLLABUS ROUTES ─────────────────────────────────────────────────────────

// SYLLABUS ROUTES

app.get('/api/syllabi', auth, async (req, res) => {
  try {
    const syllabi = await Syllabus.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(syllabi);
  } catch (err) {
    console.error('GET /api/syllabi Error:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/syllabi', auth, async (req, res) => {
  try {
    const { id, title, topics } = req.body;
    let syllabus;

    if (id && mongoose.Types.ObjectId.isValid(id)) {
      syllabus = await Syllabus.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { $set: { title, topics, updatedAt: Date.now() } },
        { new: true }
      );
    }

    if (!syllabus) {
      syllabus = new Syllabus({
        userId: req.user.id,
        title,
        topics
      });
      await syllabus.save();
    }

    res.json(syllabus);
  } catch (err) {
    console.error('POST /api/syllabi Error:', err);
    res.status(500).json({ message: 'Server Error saving syllabus' });
  }
});

app.delete('/api/syllabi/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid syllabus ID' });
    }

    const result = await Syllabus.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!result) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }

    res.json({ message: 'Syllabus deleted' });
  } catch (err) {
    console.error('DELETE /api/syllabi/:id Error:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`-----------------------------------------------`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Network access on http://0.0.0.0:${PORT}`);
  console.log(`-----------------------------------------------`);
});
