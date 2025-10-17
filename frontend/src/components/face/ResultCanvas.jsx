import { useEffect, useRef } from "react";

export default function ResultCanvas({ imageUrl, boxes }) {
  const canvasRef = useRef();
  const containerRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageUrl;

    let frame = 0;

    img.onload = () => {
      const containerWidth = containerRef.current.offsetWidth || 500;
      const scale = img.width > containerWidth ? containerWidth / img.width : 1;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        boxes.forEach((box) => {
          // Bounding box
          ctx.strokeStyle = "#ff4d4d";
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 4]);
          ctx.strokeRect(
            box.x * scale,
            box.y * scale,
            box.width * scale,
            box.height * scale
          );

          // Blinking top-left dot
          ctx.fillStyle = frame % 60 < 30 ? "#ff4d4d" : "#ff9999";
          ctx.beginPath();
          ctx.arc(box.x * scale + 5, box.y * scale + 5, 5, 0, 2 * Math.PI);
          ctx.fill();
        });

        frame++;
        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    return () => cancelAnimationFrame(animationRef.current);
  }, [imageUrl, boxes]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block mt-4 shadow-lg rounded-lg overflow-hidden"
    >
      <canvas ref={canvasRef} className="rounded-lg border border-gray-300" />
      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg shadow-lg text-sm animate-pulse">
        Faces detected: {boxes.length}
      </div>
    </div>
  );
}
