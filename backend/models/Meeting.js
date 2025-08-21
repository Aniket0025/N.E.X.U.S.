import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  visibility: { type: String, enum: ['class', 'students'], default: 'class' },
  meetLink: { type: String },
  calendarEventId: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  createdFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);
