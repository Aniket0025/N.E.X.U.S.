import mongoose from "mongoose";
import validator from "validator";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  grade: { type: String, required: true },
  deadline: { type: Date, required: true },
  fileUrl: { type: String }, // File storage URL
});

const submittedAssignmentSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  submissionText: { type: String },
  submittedFileUrl: { type: String }, // Student file upload
  submittedAt: { type: Date, default: Date.now },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
export const SubmittedAssignment = mongoose.model('SubmittedAssignment', submittedAssignmentSchema);
