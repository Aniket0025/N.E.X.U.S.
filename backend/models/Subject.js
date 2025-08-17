import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
