import express from 'express';
import { submitAssignment } from '../controllers/assignmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitAssignment);

export default router;
