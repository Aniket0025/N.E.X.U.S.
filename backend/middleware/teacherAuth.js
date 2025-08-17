import jwt from 'jsonwebtoken';
import Teacher from '../models/Teacher.js';

export default async function teacherAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.id);
    if (!teacher) return res.status(401).json({ message: 'Teacher not found' });
    req.teacher = { id: teacher._id, name: teacher.name, email: teacher.email };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
