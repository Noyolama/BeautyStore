import { useState, useEffect } from "react";

const images = [
  "/images/Skincare/1 GLYNT breeze smoothing spray.jpg",
  "/images/Skincare/2 The Ordinary skincare covarage foundation.jpg",
  "/images/Skincare/3 marin smoothing hydration cream.webp",
  "/images/Skincare/2 The Ordinary Hair Care Line.jpg",
  "/images/Skincare/2 The Ordinary body care.jpg",
  "/images/Skincare/1 GLYNT nutri shampoo.jpg",

];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1000); // 1000ms = 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 overflow-hidden rounded bg-white">
      <div className="w-full">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-80 object-cover" // object-contain shows full image
        />
      </div>

      {/* Optional previous/next buttons */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-purple-200 p-2 rounded-full shadow"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-purple-200 p-2 rounded-full shadow"
      >
        &#10095;
      </button>
    </div>
  );
}

