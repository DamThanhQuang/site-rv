"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { FaHome, FaCalendarAlt, FaChartLine, FaRegSmile } from "react-icons/fa";
import axios from "axios"; // Add missing import

export default function PublishCelebration() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  // Add missing state variables
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<any>(null);

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  // Theo dõi kích thước cửa sổ cho confetti
  useEffect(() => {
    // Chỉ chạy ở phía client
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set kích thước ban đầu
    handleResize();

    // Thêm event listener
    window.addEventListener("resize", handleResize);

    // Tắt confetti sau 8 giây
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Phần code quan trọng trong publish-celebration.tsx để lưu sản phẩm
  useEffect(() => {
    async function publishProduct() {
      try {
        setIsLoading(true);

        // Thu thập dữ liệu từ localStorage
        const productData = {
          title: localStorage.getItem("title") || "",
          description: localStorage.getItem("description") || "",
          price: Number(localStorage.getItem("price") || 0),
          businessId: localStorage.getItem("businessId") || "",
          discountedPrice: Number(localStorage.getItem("discountedPrice") || 0),
          propertyType: localStorage.getItem("propertyType") || "",
          privacyType: localStorage.getItem("privacyType") || "",
          location: JSON.parse(localStorage.getItem("location") || "{}"),
          amenities: JSON.parse(localStorage.getItem("amenities") || "[]"),
          images: JSON.parse(localStorage.getItem("images") || "[]"),
          livingRooms: Number(localStorage.getItem("livingRooms") || 1),
          bedrooms: Number(localStorage.getItem("bedrooms") || 1),
          beds: Number(localStorage.getItem("beds") || 1),
          bathrooms: Number(localStorage.getItem("bathrooms") || 1),
        };

        // Lấy token từ localStorage
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Bạn cần đăng nhập để thực hiện chức năng này");
        }

        // Gửi dữ liệu lên API
        const response = await axios.post(
          "http://localhost:3001/product",
          productData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Lưu kết quả trả về để sử dụng trong UI
        setProductData(response.data);

        // Xử lý kết quả trả về
        console.log("Sản phẩm đã được tạo:", response.data);

        // Xóa dữ liệu khỏi localStorage
        Object.keys(productData).forEach((key) => {
          localStorage.removeItem(key);
        });
      } catch (err: any) {
        console.error("Lỗi khi gửi sản phẩm:", err);
        setError(err.response?.data?.message || "Đã có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    }

    publishProduct();
  }, []);

  const handleGoToDashboard = () => {
    router.push("/host/dashboard/today");
  };

  // Xử lý chuyển đến trang chỉnh sửa sản phẩm
  const handleEditListing = () => {
    if (productData && productData._id) {
      router.push(`/host/listings/${productData._id}/edit`);
    } else {
      router.push("/host/listings");
    }
  };

  // Xử lý chuyển tới trang lịch
  const handleGoToCalendar = () => {
    if (productData && productData._id) {
      router.push(`/host/calendar/${productData._id}`);
    } else {
      router.push("/host/calendar");
    }
  };

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Hiệu ứng confetti */}
      {showConfetti && !isLoading && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={[
            "#f43f5e",
            "#fb7185",
            "#fda4af",
            "#fecdd3",
            "#fda4af",
            "#fda4af",
          ]}
        />
      )}

      {/* Hiển thị trạng thái loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700">Đang hoàn thành việc đăng sản phẩm...</p>
        </div>
      ) : (
        <motion.div
          className="max-w-3xl w-full flex flex-col items-center text-center z-10"
          variants={containerVariant}
          initial="hidden"
          animate="show"
        >
          {/* Biểu tượng nhà */}
          <motion.div
            variants={itemVariant}
            className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mb-8"
          >
            <FaHome className="text-white text-5xl" />
          </motion.div>

          {/* Tiêu đề */}
          <motion.h1
            variants={itemVariant}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Xin chúc mừng bạn!
          </motion.h1>

          {/* Thông điệp */}
          <motion.p
            variants={itemVariant}
            className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed"
          >
            Hoan nghênh bạn đăng mục cho thuê – Lời chia vui từ Chủ nhà đến Chủ
            nhà. Cảm ơn bạn đã chia sẻ nhà mình và giúp tạo ra những trải nghiệm
            tuyệt vời cho các vị khách của chúng ta.
          </motion.p>

          {/* Hiển thị thông tin sản phẩm đã tạo thành công */}
          {productData && (
            <motion.div
              variants={itemVariant}
              className="w-full bg-white p-4 rounded-lg shadow-sm mb-8"
            >
              <h3 className="font-medium text-rose-500 mb-2">
                Sản phẩm đã được đăng thành công
              </h3>
              <p className="text-gray-800 font-semibold">{productData.title}</p>
              {productData.location && (
                <p className="text-gray-600 text-sm">
                  {productData.location.address}, {productData.location.city}
                </p>
              )}
              <p className="text-gray-600 text-sm mt-1">
                {productData.bedrooms} phòng ngủ · {productData.bathrooms} phòng
                tắm
              </p>
            </motion.div>
          )}

          {/* Chữ ký */}
          <motion.div variants={itemVariant} className="mb-10">
            <p className="text-gray-600 font-medium">
              Thanh Quang, Tổng giám đốc điều hành
            </p>
          </motion.div>

          {/* Nút hành động */}
          <motion.div variants={itemVariant} className="w-full max-w-md">
            <motion.button
              onClick={handleGoToDashboard}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg text-lg flex items-center justify-center transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaChartLine className="mr-2" />
              Đi đến bảng điều khiển chủ nhà
            </motion.button>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all cursor-pointer"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                onClick={handleGoToCalendar}
              >
                <FaCalendarAlt className="text-2xl text-rose-500 mb-3" />
                <h3 className="font-medium">Thiết lập lịch</h3>
                <p className="text-sm text-gray-600">
                  Chọn ngày có thể đặt phòng
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all cursor-pointer"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                onClick={handleEditListing}
              >
                <FaRegSmile className="text-2xl text-rose-500 mb-3" />
                <h3 className="font-medium">Chỉnh sửa mục cho thuê</h3>
                <p className="text-sm text-gray-600">
                  Cập nhật thông tin chi tiết
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hiệu ứng đường thẳng xoắn */}
      <div
        className="absolute -bottom-10 left-0 right-0 h-20 bg-contain bg-repeat-x"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='40' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C 30 0, 70 0, 100 10 C 70 20, 30 20, 0 10 Z' fill='%23fda4af' fill-opacity='0.3'/%3E%3C/svg%3E\")",
        }}
      ></div>
    </div>
  );
}
