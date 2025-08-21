import express from 'express';
import fetch from 'node-fetch';
import teacherAuth from '../middleware/teacherAuth.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';
import Announcement from '../models/Announcement.js';
import AttendanceSession from '../models/AttendanceSession.js';
import jwt from 'jsonwebtoken';
import Meeting from '../models/Meeting.js';

const router = express.Router();

// Teacher dashboard: student count in subjects taught, announcements
router.get('/dashboard', teacherAuth, async (req, res) => {
  try {
    // Find all subjects taught by this teacher
    const subjects = await Subject.find({ _id: { $in: (await Teacher.findById(req.teacher.id)).subjects } }).populate('assignedClass');
    // Find all students enrolled in those subjects
    const students = await Student.find({ subjects: { $in: subjects.map(s => s._id) } });
    // Get admin announcements (all for now)
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(10);
    res.json({ studentCount: students.length, announcements });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a meeting (Google Calendar event with Meet link)
router.post('/meetings', teacherAuth, async (req, res) => {
  try {
    const { title, description, start, end, meetLink, visibility, class: classId, students } = req.body;
    if (!title || !start || !end) return res.status(400).json({ message: 'Title, start, end required' });

    const teacher = await Teacher.findById(req.teacher.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Accept only Jitsi links if provided, else generate one
    let finalLink = null;
    if (meetLink && meetLink.trim()) {
      const isJitsi = /^https?:\/\/(meet\.jit\.si)(\/|$)/.test(meetLink.trim());
      if (!isJitsi) {
        return res.status(400).json({ message: 'Only Jitsi links are allowed. Please provide a link starting with https://meet.jit.si/' });
      }
      finalLink = meetLink.trim();
    } else {
      const room = `Nexus-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      finalLink = `https://meet.jit.si/${room}`;
    }

    const payload = {
      title,
      description,
      start: new Date(start),
      end: new Date(end),
      meetLink: finalLink,
      createdBy: req.teacher.id,
      createdFor: teacher.createdBy
    };
    if (visibility === 'class' && classId) {
      payload.visibility = 'class';
      payload.class = classId;
    } else if (visibility === 'students' && Array.isArray(students) && students.length) {
      payload.visibility = 'students';
      payload.students = students;
    }

    const meeting = await Meeting.create(payload);

    return res.status(201).json({ meeting });
  } catch (err) {
    console.error('Create meeting error:', err);
    res.status(500).json({ message: 'Failed to create meeting', error: err.message });
  }
});

// List meetings created by teacher
router.get('/meetings', teacherAuth, async (req, res) => {
  try {
    const meetings = await Meeting.find({ createdBy: req.teacher.id }).sort({ start: 1 });
    res.json({ meetings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meetings', error: err.message });
  }
});

// Cancel (delete) a meeting created by this teacher
router.delete('/meetings/:id', teacherAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findOne({ _id: id, createdBy: req.teacher.id });
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    await meeting.deleteOne();
    return res.json({ message: 'Meeting cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel meeting', error: err.message });
  }
});

// Teacher subjects and classes
router.get('/subjects', teacherAuth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).populate({
      path: 'subjects',
      populate: { path: 'assignedClass', select: 'name' }
    });
    res.json({ subjects: teacher.subjects });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all students enrolled in teacher's subjects
router.get('/students', teacherAuth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id);
    const subjects = teacher.subjects;
    const students = await Student.find({ subjects: { $in: subjects } })
      .populate('class', 'name')
      .select('name email class rollNo registrationNumber');
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get students for a specific subject and class
router.get('/subjects/:subjectId/class/:classId/students', teacherAuth, async (req, res) => {
  try {
    const { subjectId, classId } = req.params;
    const students = await Student.find({
      class: classId,
      subjects: subjectId
    })
      .populate('class', 'name')
      .select('name email class rollNo registrationNumber');
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create attendance session
router.post('/attendance/session', teacherAuth, async (req, res) => {
  try {
    const { subject, class: classId, date, startTime, endTime, topic } = req.body;
    if (!subject || !classId || !date || !startTime || !endTime || !topic) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const session = await AttendanceSession.create({
      teacher: req.teacher.id,
      subject,
      class: classId,
      date,
      startTime,
      endTime,
      topic,
      attendance: []
    });
    res.status(201).json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark attendance for a session
router.post('/attendance/:sessionId/mark', teacherAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { attendance } = req.body; // [{student, present}, ...]
    if (!Array.isArray(attendance)) return res.status(400).json({ message: 'Attendance array required' });
    const session = await AttendanceSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    session.attendance = attendance;
    await session.save();
    res.json({ message: 'Attendance marked', session });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all sessions for a subject/class with average attendance
router.get('/subjects/:subjectId/class/:classId/sessions', teacherAuth, async (req, res) => {
  try {
    const { subjectId, classId } = req.params;
    const sessions = await AttendanceSession.find({
      teacher: req.teacher.id,
      subject: subjectId,
      class: classId
    }).sort({ date: -1 });
    // Calculate average attendance for each session
    const sessionsWithAvg = sessions.map(s => {
      const total = s.attendance.length;
      const present = s.attendance.filter(a => a.present).length;
      return {
        _id: s._id,
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        topic: s.topic,
        average: total > 0 ? Math.round((present / total) * 100) : 0
      };
    });
    res.json({ sessions: sessionsWithAvg });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get attendance for a session
router.get('/attendance/session/:sessionId', teacherAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await AttendanceSession.findById(sessionId).populate({
      path: 'attendance.student',
      select: 'name rollNo registrationNumber email class'
    });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Google OAuth Teacher Login
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
    // Check if teacher email exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(403).json({ message: 'Access denied. Not a teacher.' });
    }
    // Issue JWT
    const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key';
    const jwtToken = jwt.sign({ id: teacher._id, email: teacher.email, role: 'teacher' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token: jwtToken, teacher: { id: teacher._id, name: teacher.name, email: teacher.email } });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
