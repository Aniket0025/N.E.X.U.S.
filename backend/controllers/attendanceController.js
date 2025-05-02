
import { handleValidationError } from "../middlewares/errorHandler.js";

import { Attendance } from "../models/attendanceSchema.js";

export const markAttendance = async (req, res) => {
  const { name, registrationNumber, subject, date, startTime, endTime, status } = req.body;

  if (!name || !registrationNumber || !subject || !date || !status || !startTime || !endTime) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAttendance=await Attendance.findOne({name:name,subject:subject,date:date,name:name,status:status,startTime:startTime,endTime:endTime});
    if(existingAttendance){
      return res.status(400).json({ success: false, message: "Error Attendance Already exists"});
    }
    const newAttendance = new Attendance({ name, registrationNumber, subject, date, startTime, endTime, status });
    await newAttendance.save();

    res.status(201).json({ success: true, message: "Attendance recorded successfully", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving attendance", error: error.message });
  }
};


export const getStudentAttendance = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Student name is required",
    });
  }

  try {
    const records = await Attendance.find({ name }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendance: records,
    });
  } catch (error) {
    next(error);
  }
};
