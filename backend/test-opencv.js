import cv from 'opencv4nodejs';
import path from 'path';

const imgPath = path.join(process.cwd(), 'uploads', 'sample.jpg');

// Read image
const img = cv.imread(imgPath);

// Convert to grayscale
const gray = img.bgrToGray();

// Load Haar cascade
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// Detect faces
const faces = classifier.detectMultiScale(gray).objects;

console.log('Faces detected:', faces.length);
faces.forEach((f, i) => console.log(`Face ${i}:`, f));
