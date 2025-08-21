import express from 'express';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Announcement from '../models/Announcement.js';
import Subject from '../models/Subject.js';
import AttendanceSession from '../models/AttendanceSession.js';
import Meeting from '../models/Meeting.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key';

// Student Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ message: 'Invalid credentials.' });
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });
    const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List meetings available to the student
router.get('/meetings', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
    const token = auth.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const student = await Student.findById(decoded.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const query = {
      $or: [
        { visibility: 'class', class: student.class },
        { visibility: 'students', students: student._id }
      ]
    };
    const meetings = await Meeting.find(query).sort({ start: 1 });
    res.json({ meetings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Student Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // JWT Auth
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
    const token = auth.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const student = await Student.findById(decoded.id).populate('subjects');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const subjectCount = student.subjects.length;
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(10);
    res.json({ subjectCount, announcements });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all subjects for student with average attendance
router.get('/subjects', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
    const token = auth.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const student = await Student.findById(decoded.id).populate('subjects');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    // For each subject, calculate average attendance
    const subjectsWithAttendance = await Promise.all(student.subjects.map(async (subject) => {
      const sessions = await AttendanceSession.find({ subject: subject._id, 'attendance.student': student._id });
      let totalSessions = 0;
      let presentSessions = 0;
      sessions.forEach(session => {
        const att = session.attendance.find(a => a.student.toString() === student._id.toString());
        if (att) {
          totalSessions++;
          if (att.present) presentSessions++;
        }
      });
      const averageAttendance = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;
      return { ...subject.toObject(), averageAttendance };
    }));
    res.json({ subjects: subjectsWithAttendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get sessions for a subject with teacher and attendance for student
router.get('/subjects/:subjectId/attendance', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
    const token = auth.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const student = await Student.findById(decoded.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const subjectId = req.params.subjectId;
    // Find the teacher for this subject
    const subject = await Subject.findById(subjectId).populate('assignedClass');
    const teacher = await (await import('../models/Teacher.js')).default.findOne({ subjects: subjectId });
    // Find all sessions for this subject and the student's class
    const sessions = await AttendanceSession.find({ subject: subjectId, class: student.class }).sort({ date: -1 });
    // For each session, find attendance for this student
    const sessionsWithAttendance = sessions.map(session => {
      const att = session.attendance.find(a => a.student.toString() === student._id.toString());
      return {
        _id: session._id,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        topic: session.topic,
        attendance: att ? { present: att.present } : { present: false }
      };
    });
    res.json({
      teacher: teacher ? { name: teacher.name, email: teacher.email } : null,
      sessions: sessionsWithAttendance
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Google OAuth Student Login
router.post('/google-login', async (req, res) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) {
      return res.status(400).json({ message: 'Email and token required.' });
    }
    // Verify Google token
    const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const googleData = await googleRes.json();
    if (googleData.email !== email) {
      return res.status(401).json({ message: 'Invalid Google credentials.' });
    }
    // Check if student email exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(403).json({ message: 'Access denied. Not a student.' });
    }
    // Issue JWT
    const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key';
    const jwtToken = jwt.sign({ id: student._id, email: student.email, role: 'student' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token: jwtToken, student: { id: student._id, name: student.name, email: student.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
