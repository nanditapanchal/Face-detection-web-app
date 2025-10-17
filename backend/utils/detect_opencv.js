import cv from 'opencv4nodejs';

export default async function detectOpenCV(imagePath) {
  try {
    const img = await cv.imreadAsync(imagePath);
    const gray = img.bgrToGray();
    // Use pre-trained Haar cascade provided with OpenCV — adjust path if needed
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const detections = classifier.detectMultiScale(gray).objects;
    const boxes = detections.map(rect => ({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      confidence: 1.0
    }));
    return boxes;
  } catch (err) {
    console.error('detectOpenCV error', err);
    return [];
  }
}
