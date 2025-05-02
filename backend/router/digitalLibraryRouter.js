import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadBook, getAllDigitalBooks } from '../controllers/digitalLibraryController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadBook);
router.get('/getall', getAllDigitalBooks);

export default router;
