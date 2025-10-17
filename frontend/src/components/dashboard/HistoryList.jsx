import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // ✅ use axiosInstance (token support)
import { motion } from "framer-motion";

const HistoryList = function () {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // ✅ preview state

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this history item?")) return;
    console.log("item_id: ", id)
    try {
      const res = await axiosInstance.delete(`/facedetect/history/${id}`);
      if (res.data?.success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
        setHistory((prev) => prev.filter((item) => console.log("hello: ", item)));
      } else {
        alert(res.data?.message || "Failed to delete item");
      }
    } catch (err) {
      console.error("❌ Error deleting item:", err);
      alert(err.response?.data?.message || "Failed to delete item");
    }
  };
  console.log("The history is : ",history);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get(`/facedetect/history`);
        if (res.data.success && Array.isArray(res.data.history)) {
          setHistory(res.data.history);
        } else {
          throw new Error(res.data.message || "Invalid response format");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // ✅ do not add handleDelete as dependency

  if (loading)
    return <p className="text-center mt-4 text-gray-500">Loading history...</p>;

  if (error)
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading history: {error}
      </p>
    );

  if (!history || history.length === 0)
    return <p className="text-center mt-4 text-gray-500">No history found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {history.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img
                src={
                  item.imageUrl.startsWith("http")
                    ? item.imageUrl
                    : `http://localhost:5000${item.imageUrl}`
                }
                alt="Detected Face"
                className="w-full h-48 object-cover cursor-pointer"
                onError={(e) => (e.target.style.display = "none")}
                onClick={() =>
                  setPreviewImage(
                    item.imageUrl.startsWith("http")
                      ? item.imageUrl
                      : `http://localhost:5000${item.imageUrl}`
                  )
                }
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {item.detectedCount} face{item.detectedCount !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="p-4">
              <p className="text-gray-700 text-sm mb-2">
                <strong>Detected Faces:</strong> {item.detectedCount}
              </p>
              <p className="text-gray-500 text-xs mb-3">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              {item.boxes && item.boxes.length > 0 && (
                <div className="text-xs text-gray-600 mb-3">
                  <strong>Coordinates:</strong>{" "}
                  {item.boxes.map((b, i) => (
                    <span key={i}>
                      [x:{b.x}, y:{b.y}, w:{b.width}, h:{b.height}]
                      {i < item.boxes.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleDelete(item._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent modal close on image click
          />
        </div>
      )}
    </>
  );
};

export { HistoryList };
