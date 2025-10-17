import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageUploader({ onUpload }) {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onUpload(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Styled Upload Button */}
      <motion.label
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {fileName ? "Change Image" : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </motion.label>

      {/* Display selected file name */}
      <AnimatePresence>
        {fileName && (
          <motion.p
            className="mt-3 text-gray-700 text-sm"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            Selected File: <span className="font-semibold">{fileName}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Image preview */}
      <AnimatePresence>
        {preview && (
          <motion.img
            key={preview}
            src={preview}
            alt="Preview"
            className="mt-4 w-64 h-auto rounded-lg shadow-md object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
