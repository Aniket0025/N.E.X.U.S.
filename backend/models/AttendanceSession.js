import mongoose from 'mongoose';

const attendanceSessionSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  topic: { type: String, required: true },
  attendance: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
      present: { type: Boolean, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AttendanceSession', attendanceSessionSchema);
