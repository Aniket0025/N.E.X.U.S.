import jwt from 'jsonwebtoken';
import { Student } from '../models/studentSchema.js';

export const studentSignIn = async (req, res) => {
  const { name, registrationNumber } = req.body;

  try {
    const existingStudent = await Student.findOne({ name, registrationNumber });

    if (!existingStudent) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT with studentId
    const token = jwt.sign({ studentId: existingStudent._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      student: {
        _id: existingStudent._id, // ✅ Include studentId
        name: existingStudent.name,
        registrationNumber: existingStudent.registrationNumber,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
