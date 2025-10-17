import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";

export default function WebcamCapture({ onCapture }) {
  const webcamRef = useRef();
  const [captured, setCaptured] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setCaptured(true);
      setTimeout(() => setCaptured(false), 2000); // show captured feedback briefly
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Webcam Container */}
      <motion.div
        className="relative rounded-lg overflow-hidden shadow-lg border-4 border-gray-200 w-72 h-56 md:w-96 md:h-72"
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
        />

        <AnimatePresence>
          {captured && (
            <motion.div
              key="capturedOverlay"
              className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center text-white font-bold text-lg rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Captured!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Capture Button */}
      <motion.button
        onClick={capture}
        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Capture
      </motion.button>
    </div>
  );
}
