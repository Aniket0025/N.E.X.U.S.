import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import fetch from 'node-fetch';
import Class from '../models/Class.js';
import Announcement from '../models/Announcement.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import adminAuth from '../middleware/auth.js';

const router = express.Router();

// Teacher Login
router.post('/teacher/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: teacher._id, role: 'teacher' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, teacher: { id: teacher._id, name: teacher.name, email: teacher.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key';

// Admin Dashboard (counts and announcements)
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const teacherCount = await Teacher.countDocuments({ createdBy: req.admin.id });
    const studentCount = await Student.countDocuments({ createdBy: req.admin.id });
    const classCount = await Class.countDocuments({ createdBy: req.admin.id });
    const announcements = await Announcement.find({ createdBy: req.admin.id }).sort({ createdAt: -1 });
    res.json({ teacherCount, studentCount, classCount, announcements });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Classes endpoints
router.get('/classes', adminAuth, async (req, res) => {
  try {
    const classes = await Class.find({ createdBy: req.admin.id }).sort({ createdAt: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/classes', adminAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Class name required' });
    const exists = await Class.findOne({ name, createdBy: req.admin.id });
    if (exists) return res.status(409).json({ message: 'Class already exists' });
    const newClass = new Class({ name, createdBy: req.admin.id });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Subjects endpoints
router.get('/subjects', adminAuth, async (req, res) => {
  try {
    const subjects = await Subject.find({ createdBy: req.admin.id }).populate('assignedClass');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/subjects', adminAuth, async (req, res) => {
  try {
    const { name, assignedClass } = req.body;
    if (!name || !assignedClass) return res.status(400).json({ message: 'Name and assigned class required' });
    const subject = new Subject({ name, assignedClass, createdBy: req.admin.id });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Announcements endpoints
router.get('/announcements', adminAuth, async (req, res) => {
  try {
    const anns = await Announcement.find({ createdBy: req.admin.id }).sort({ createdAt: -1 });
    res.json(anns);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/announcements', adminAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    const ann = new Announcement({ title, content, createdBy: req.admin.id });
    await ann.save();
    res.status(201).json(ann);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Teachers endpoints
router.get('/teachers', adminAuth, async (req, res) => {
  try {
    const teachers = await Teacher.find({ createdBy: req.admin.id })
      .populate({
        path: 'subjects',
        populate: { path: 'assignedClass', select: 'name' }
      });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/teachers', adminAuth, async (req, res) => {
  try {
    const { name, email, password, subjects } = req.body;
    if (!name || !email || !password || !Array.isArray(subjects)) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const exists = await Teacher.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Teacher already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ name, email, password: hashedPassword, subjects, createdBy: req.admin.id });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get students by class
import AttendanceSession from '../models/AttendanceSession.js';

router.get('/classes/:id/students', adminAuth, async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.id, createdBy: req.admin.id })
      .populate('class')
      .populate('subjects');
    // For each student, calculate average attendance across all courses
    const studentsWithAttendance = await Promise.all(students.map(async (student) => {
      const sessions = await AttendanceSession.find({ 'attendance.student': student._id });
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
      return { ...student.toObject(), averageAttendance };
    }));
    res.json(studentsWithAttendance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update student by id
router.put('/students/:id', adminAuth, async (req, res) => {
  try {
    const { name, registrationNumber, rollNo, email, password, class: classId, subjects } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (name) student.name = name;
    if (registrationNumber) student.registrationNumber = registrationNumber;
    if (rollNo) student.rollNo = rollNo;
    if (email) student.email = email;
    if (classId) student.class = classId;
    if (subjects && Array.isArray(subjects) && subjects.length > 0) {
      student.subjects = subjects;
    } else if (classId) {
      // If class changed and no explicit subjects, assign all subjects for that class
      const newSubjects = await Subject.find({ assignedClass: classId });
      student.subjects = newSubjects.map(s => s._id);
    }
    if (password) {
      student.password = await bcrypt.hash(password, 10);
    }
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Students endpoints
router.get('/students', adminAuth, async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.admin.id })
      .populate('class')
      .populate('subjects');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/students', adminAuth, async (req, res) => {
  try {
    const { name, registrationNumber, rollNo, email, password, class: classId } = req.body;
    if (!name || !registrationNumber || !rollNo || !email || !password || !classId) {
      return res.status(400).json({ message: 'All fields required' });
    }
    // Find all subjects assigned to the class
    const subjects = await Subject.find({ assignedClass: classId });
    const exists = await Student.findOne({ $or: [{ email }, { registrationNumber }] });
    if (exists) return res.status(409).json({ message: 'Student already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      registrationNumber,
      rollNo,
      email,
      password: hashedPassword,
      class: classId,
      subjects: subjects.map(s => s._id),
      createdBy: req.admin.id
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    // Create JWT
    const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Google OAuth Admin Login
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
    // Check if admin email exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
    // Issue JWT
    const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key';
    const jwtToken = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: jwtToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
