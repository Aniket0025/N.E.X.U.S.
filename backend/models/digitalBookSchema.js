import mongoose from 'mongoose';

const digitalBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  fileUrl: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export const DigitalBook = mongoose.model('DigitalBook', digitalBookSchema);
