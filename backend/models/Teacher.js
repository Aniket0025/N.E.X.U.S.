import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  google: {
    accessToken: { type: String },
    refreshToken: { type: String },
    expiryDate: { type: Date },
    email: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
