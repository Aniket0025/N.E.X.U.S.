import express from "express";
import { markAttendance ,getStudentAttendance} from "../controllers/attendanceController.js";

const router = express.Router();

router.post('/mark', markAttendance);
router.post('/getAttendance', getStudentAttendance);
// router.get('/getall', getAllAttendance);

export default router;
