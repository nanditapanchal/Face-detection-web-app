import express from "express";
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import fs from 'fs';
import connectDB from './config/db.js'; // <- import DB connection

import authRoutes from './routes/auth.js';
import faceRoutes from './routes/facedetect.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// create upload dir if not exists
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
app.use('/uploads', express.static(path.join(process.cwd(), UPLOAD_DIR)));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/facedetect', faceRoutes);

// connect DB then start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
