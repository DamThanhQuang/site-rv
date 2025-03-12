"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdOutlineCabin } from "react-icons/md";
import { FaPen, FaCheck, FaTimes } from "react-icons/fa";

export default function Title() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxLength = 32;

  // Load saved data on component mount only
  useEffect(() => {
    try {
      const savedTitle = localStorage.getItem("title");
      if (savedTitle) {
        const savedData = JSON.parse(savedTitle);
        if (savedData.title) {
          setTitle(savedData.title);
          setIsComplete(true);
        }
      }
    } catch (error) {
      console.error("Get saved data error:", error);
    }
  }, []); // Empty dependency array to run only once on mount

  // Update isComplete whenever title changes
  useEffect(() => {
    setIsComplete(title.length > 0 && title.length <= maxLength);
  }, [title]);

  // Tính số ký tự và validate
  const charCount = title.length;
  const isValid = charCount > 0 && charCount <= maxLength;

  // Kiểm tra độ dài tiêu đề để phân loại
  const getTitleFeedback = () => {
    if (charCount === 0)
      return { message: "Tiêu đề không được để trống", color: "text-gray-400" };
    if (charCount < 10)
      return { message: "Tiêu đề nên dài hơn", color: "text-amber-500" };
    if (charCount <= 20)
      return { message: "Tiêu đề tốt", color: "text-green-500" };
    if (charCount <= maxLength)
      return { message: "Tiêu đề đã đủ dài", color: "text-blue-500" };
    return { message: "Tiêu đề quá dài", color: "text-red-500" };
  };

  const feedback = getTitleFeedback();

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBack = () => {
    router.push("/create/photo");
  };

  const handleNext = () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      // Save the current title value
      localStorage.setItem("title", JSON.stringify({ title }));
      router.push("/create/description");
    } catch (error) {
      console.error("Save data error:", error);
      setError("Đã xảy ra lỗi, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  // Example titles for inspiration
  const exampleTitles = [
    "Cabin gỗ yên bình giữa rừng thông",
    "Cabin view hồ với lò sưởi đá",
    "Cabin nghỉ dưỡng gần suối",
    "Cabin mộc mạc với sân hiên rộng",
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục cabin của bạn
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay
          đổi tiêu đề sau.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        {/* Property type indicator */}
        <motion.div
          variants={itemVariant}
          className="flex items-center mb-6 p-3 bg-gray-50 rounded-md border border-gray-200"
        >
          <MdOutlineCabin className="text-2xl text-rose-500 mr-3" />
          <span className="font-medium">Cabin của bạn</span>
        </motion.div>

        {/* Title input */}
        <motion.div variants={itemVariant} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={maxLength + 5} // Cho phép nhập thêm một chút để hiển thị thông báo lỗi
              placeholder="Ví dụ: Cabin gỗ yên bình với view hồ tuyệt đẹp"
              className={`w-full p-4 text-xl border rounded-lg transition-all ${
                isFocused
                  ? "border-rose-500 ring-2 ring-rose-100"
                  : charCount > maxLength
                  ? "border-red-500"
                  : isValid && charCount > 0
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
              {charCount > 0 && (
                <span
                  className={`mr-2 text-sm font-medium ${
                    charCount > maxLength ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {charCount}/{maxLength}
                </span>
              )}

              {charCount === 0 && <FaPen className="text-gray-400" />}
              {charCount > 0 && charCount <= maxLength && (
                <FaCheck className="text-green-500" />
              )}
              {charCount > maxLength && <FaTimes className="text-red-500" />}
            </div>
          </div>

          {/* Feedback message */}
          <div className={`mt-2 text-sm ${feedback.color}`}>
            {feedback.message}
          </div>
        </motion.div>

        {/* Title tips */}
        <motion.div variants={itemVariant} className="mb-8">
          <h3 className="font-medium text-lg mb-3">Mẹo đặt tiêu đề hay:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              Nêu bật đặc điểm độc đáo nhất của chỗ ở
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              Đề cập đến vị trí và cảnh quan xung quanh
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              Giữ tiêu đề ngắn gọn nhưng có thông tin
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              Tránh viết HOA toàn bộ hoặc dùng quá nhiều ký hiệu đặc biệt
            </li>
          </ul>
        </motion.div>

        {/* Example titles */}
        <motion.div variants={itemVariant} className="mb-12">
          <h3 className="font-medium text-lg mb-3">Một số ví dụ hay:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exampleTitles.map((example, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 border border-gray-200 rounded-md hover:border-gray-300 cursor-pointer transition-colors"
                onClick={() => setTitle(example)}
              >
                {example}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Buttons điều hướng */}
      <motion.div
        className="mt-8 w-full flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button
          className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
          whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          disabled={isLoading}
        >
          Quay lại
        </motion.button>
        <motion.button
          className={`px-6 py-3 bg-rose-500 text-white font-medium rounded-lg transition ${
            !isValid || isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          whileHover={{
            scale: isValid && !isLoading ? 1.05 : 1,
            backgroundColor: isValid && !isLoading ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: isValid && !isLoading ? 0.95 : 1 }}
          disabled={!isValid || isLoading}
          onClick={handleNext}
        >
          {isLoading ? "Đang xử lý..." : "Tiếp theo"}
        </motion.button>
      </motion.div>

      {error && (
        <motion.div
          className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
