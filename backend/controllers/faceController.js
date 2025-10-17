import History from '../models/History.js';
import path from 'path';
import fs from 'fs';
import detectOpenCV from '../utils/detect_opencv.js';
import axios from 'axios';

export async function handleFaceDetect(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image' });
    const imagePath = req.file.path; 
    let boxes = await detectOpenCV(imagePath); // returns [{x,y,width,height,confidence}, ...]
    

    // Save history
    const url = `/uploads/${path.basename(imagePath)}`; // served by express static
    // const userId = req.user._id;
    const hist = await History.create({

      user: req.user._id,
      imageUrl: url,
      detectedCount: boxes.length,
      boxes
    });

    res.json({ imageUrl: url, detectedCount: boxes.length, boxes, historyId: hist._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Detection failed', error: err.message });
  }
}
export async function getHistory(req, res) {
  try {
    const userId = req.user._id; // Get from verified token
console.log(userId);
    const history = await History.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Upload history fetched successfully",
      history,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
}