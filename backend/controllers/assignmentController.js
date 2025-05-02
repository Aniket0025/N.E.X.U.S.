// controllers/assignmentController.js
import { Assignment, SubmittedAssignment } from "../models/assignmentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import multer from "multer";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/assignments/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const upload = multer({ storage });

// Create assignment with file upload support
export const createAssignment = async (req, res, next) => {
  const { title, description, grade, deadline } = req.body;
  try {
    const fileUrl = req.file ? `/uploads/assignments/${req.file.filename}` : null;
    const assignment = await Assignment.create({ title, description, grade, deadline, fileUrl });
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    next(err);
  }
};

// This is the export that was not found – ensure it is here!
export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

// Get assignments by subject/grade
export const getallbySubject = async (req, res, next) => {
  try {
    const { grade } = req.body;
    if (!grade || typeof grade !== 'string') {
      return res.status(400).json({ success: false, message: "Grade must be provided as a string." });
    }
    const assignments = await Assignment.find({ grade });
    res.status(200).json({ success: true, assignments });
  } catch (err) {
    next(err);
  }
};

// Submit assignment (with optional file upload)
export const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId, studentId, submissionText } = req.body;
    const submittedFileUrl = req.file ? `/uploads/submissions/${req.file.filename}` : null;
    if (!assignmentId || !studentId || (!submissionText && !req.file)) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newSubmission = await SubmittedAssignment.create({
      assignmentId,
      studentId,
      submissionText,
      submittedFileUrl,
    });
    res.status(201).json({ success: true, message: "Assignment submitted successfully!", data: newSubmission });
  } catch (error) {
    next(error);
  }
};

// Get all submitted assignments (for teacher review)
export const getAllSubmittedAssignments = async (req, res, next) => {
  try {
    const submissions = await SubmittedAssignment.find()
      .populate("assignmentId", "title description grade deadline fileUrl")
      .populate("studentId", "name registrationNumber");
    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};

// controllers/assignmentController.js

// For teacher assignment uploads
const assignmentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/assignments/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const assignmentUpload = multer({ storage: assignmentStorage });

// For student submission uploads
const submissionStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/submissions/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const submissionUpload = multer({ storage: submissionStorage });
