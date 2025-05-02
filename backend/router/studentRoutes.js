import express from 'express';
import { studentSignIn } from '../controllers/studentsController.js';

const router = express.Router();

router.post('/signin', studentSignIn);

export default router;
