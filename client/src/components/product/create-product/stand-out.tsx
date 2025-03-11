"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StandOut() {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Kiểm tra khi video đã tải xong
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      } else {
        videoRef.current.addEventListener("loadeddata", () => {
          setIsVideoLoaded(true);
        });
      }
    }
  }, []);

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  const handleBack = () => {
    router.push("/create/floor-plan");
  };

  const handleNext = () => {
    router.push("/create/amenity");
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Grid layout - 2 cột bằng nhau */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Cột bên trái - Phần văn bản */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="text-rose-500 font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Bước 2
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Làm cho chỗ ở của bạn trở nên nổi bật
          </motion.h1>

          <motion.div
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của
            bạn, cùng với 5 bức ảnh trở lên. Sau đó, bạn sẽ soạn tiêu đề và nội
            dung mô tả. Đừng quên chọn loại chỗ ở phù hợp với bạn.
          </motion.div>
        </motion.div>

        {/* Cột bên phải - Video */}
        <motion.div
          className="flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isVideoLoaded ? 1 : 0.5,
            scale: isVideoLoaded ? 1 : 0.95,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="w-full overflow-hidden rounded-lg shadow-lg"
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
          >
            <video
              ref={videoRef}
              data-testid="video-player"
              className="w-full h-auto rounded-lg"
              style={{ objectFit: "cover" }}
              autoPlay
              crossOrigin="anonymous"
              muted
              playsInline
              preload="auto"
            >
              <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"></source>
            </video>
          </motion.div>

          {/* Loading indicator */}
          {!isVideoLoaded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}
        </motion.div>
      </div>
      {/* Panel được di chuyển xuống dưới */}
      <motion.div
        className="mt-12 w-full flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <motion.button
          className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
          whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
        >
          Quay lại
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-rose-500 text-white font-medium rounded-lg transition"
          whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
        >
          Tiếp theo
        </motion.button>
      </motion.div>
    </main>
  );
}
