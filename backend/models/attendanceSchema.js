import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
