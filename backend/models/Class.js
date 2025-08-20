import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

// Ensure uniqueness per admin (name + createdBy), not globally on name
classSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export default mongoose.model('Class', classSchema);
