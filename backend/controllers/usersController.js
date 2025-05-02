import { handleValidationError } from "../middlewares/errorHandler.js";
import {Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";
import jwt from "jsonwebtoken"
export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingAdmin = await Admin.findOne({ email ,password });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    
    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",

    });
  } catch (err) {
    next(err);
  }
};




export const studentSignIn = async (req, res, next) => {
  const { name, registrationNumber } = req.body;
  try {
    if (!name || !registrationNumber) {
      return res.status(400).json({ success: false, message: "Please provide name and registration number" });
    }
    
    const existingStudent = await Student.findOne({ name, registrationNumber });
    if (!existingStudent) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { studentId: existingStudent._id,  }, // ✅ Include role in token
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({
      success: true,
      message: "Student signed in successfully", // Send token to frontend
      student: {
        _id: existingStudent._id,
        name: existingStudent.name,
        registrationNumber: existingStudent.registrationNumber,
        grade:existingStudent.grade,
      },token
    });
  } catch (err) {
    next(err);
  }
};


export const teacherSignIn = async (req, res, next) => { 
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    // Your sign-in logic for teacher goes here
    const existingTeacher = await Teacher.findOne({email, password});
    if (!existingTeacher) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
      teacher: {
        _id: existingTeacher._id,
        name: existingTeacher.name,
        email: existingTeacher.email,
        password:existingTeacher.password,
        subject:existingTeacher.subject,
        grade:existingTeacher.grade,
      }
    });
  } catch (err) {
    next(err);
  }
};

