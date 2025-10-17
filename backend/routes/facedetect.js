import express from 'express';
import multer from 'multer';
import path from 'path';
import auth from '../middleware/authMiddleware.js';
import { handleFaceDetect, getHistory } from '../controllers/faceController.js';
import History from '../models/History.js';

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), handleFaceDetect);
router.get('/history', auth, getHistory);
router.delete('/history/:historyId', auth, async (req, res) => {
  try {
    const { historyId } = req.params;
    console.log("🧾 Deleting history with ID:", historyId);

    const deleted = await History.findByIdAndDelete(historyId);

    if (!deleted) {
      console.log("❌ History not found:", historyId);
      return res.status(404).json({ success: false, error: 'History not found' });
    }

    console.log("✅ Deleted successfully:", deleted);
    res.status(200).json({ success: true, message: 'History deleted' });
  } catch (err) {
    console.error("🚨 Delete error stack:", err);
    res.status(500).json({ success: false, error: 'Failed to delete history', details: err.message });
  }
});

export default router;
