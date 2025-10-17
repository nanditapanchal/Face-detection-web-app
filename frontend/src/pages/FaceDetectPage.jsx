import { useState } from "react";
import ImageUploader from "../components/face/ImageUploader";
import WebcamCapture from "../components/face/WebcamCapture";
import ResultCanvas from "../components/face/ResultCanvas";
import { HistoryList } from "../components/dashboard/HistoryList";
import axiosInstance from "../utils/axiosInstance";

export default function FaceDetectPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  const handleDetection = async (fileOrBase64, isBase64 = false) => {
    if (!fileOrBase64) return;
    setLoading(true);

    let file;
    if (isBase64) {
      const byteString = atob(fileOrBase64.split(",")[1]);
      const mimeString = fileOrBase64.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      file = new File([new Blob([ab], { type: mimeString })], "capture.jpg", { type: mimeString });
    } else {
      file = fileOrBase64;
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG or PNG images allowed");
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post("/facedetect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Normalize URL for preview
      const previewUrl = res.data.imageUrl.startsWith("http")
        ? res.data.imageUrl
        : `http://localhost:5000${res.data.imageUrl}`;

      setImageUrl(previewUrl);
      setBoxes(res.data.boxes || []);

      // Notify HistoryList to refresh
      window.dispatchEvent(new Event("historyUpdated"));
    } catch (err) {
      alert(err.response?.data?.message || "Face detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Face Detection</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload + Webcam */}
        <div>
          <ImageUploader onUpload={(file) => handleDetection(file)} />
          <WebcamCapture onCapture={(base64) => handleDetection(base64, true)} />
        </div>

        {/* Result Canvas */}
        <div className="flex flex-col items-center">
          {loading && (
            <p className="text-blue-600 font-semibold animate-pulse">
              Detecting faces...
            </p>
          )}
          {imageUrl && <ResultCanvas imageUrl={imageUrl} boxes={boxes} />}
        </div>
      </div>

      {/* Detection History */}
      {userId && (
        <div className="w-full mt-8">
          <h3 className="text-xl font-semibold mb-2">Detection History</h3>
          <HistoryList userId={userId} />
        </div>
      )}
    </div>
  );
}
