import mongoose from 'mongoose';

const FaceBoxSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  confidence: Number
}, { _id: false });

const HistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  detectedCount: { type: Number, default: 0 },
  boxes: [FaceBoxSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('History', HistorySchema);