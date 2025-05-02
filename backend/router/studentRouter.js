import express from "express";
import { getAllStudents, createStudent } from "../controllers/studentController.js";
import { studentSignIn } from '../controllers/studentsController.js';
import { updateStudentSubject } from '../controllers/subjectController.js';
import { getBySubject } from '../controllers/studentController.js';
const router = express.Router();

router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.post('/signin', studentSignIn);
router.put('/update/:registrationNumber', updateStudentSubject);
router.post('/getbysubject', getBySubject);





export default router;


