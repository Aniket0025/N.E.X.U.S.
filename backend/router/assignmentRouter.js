import express from "express"
import {
  createAssignment,
  getAllAssignments,
  getAllSubmittedAssignments,
  submitAssignment,
  getallbySubject,
  assignmentUpload,
  submissionUpload,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", assignmentUpload.single("assignmentFile"), createAssignment);
router.get("/getall", getAllAssignments);
router.post("/getallbySubject", getallbySubject);
router.get("/submissions", getAllSubmittedAssignments);
router.post("/submit", submissionUpload.single("submissionFile"), submitAssignment); // ✅ Use correct upload
export default router;
