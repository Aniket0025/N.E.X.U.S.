import { Student } from '../models/studentSchema.js';

// Update Student Subject using registrationNumber
export const updateStudentSubject = async (req, res) => {
  const { registrationNumber } = req.params; // Get registration number from URL params
  const { subject } = req.body; // Get subject from request body

  if (!subject) {
    return res.status(400).json({ success: false, message: 'Subject is required' });
  }

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { registrationNumber }, // Find by registrationNumber
      { subject },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Subject updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
