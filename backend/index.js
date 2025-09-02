import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import teacherRoutes from './routes/teacher.js';
import studentRoutes from './routes/student.js';
import Class from './models/Class.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  // Ensure indexes are in sync with schema definitions
  try {
    await Class.syncIndexes();
    console.log('Indexes synced for Class');
  } catch (e) {
    console.warn('Index sync warning (Class):', e?.message || e);
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
