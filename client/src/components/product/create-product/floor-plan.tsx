"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdLiving, MdBed, MdBathroom } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

type RoomCount = {
  livingRooms: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

export default function FloorPlan() {
  const router = useRouter();
  const [roomCounts, setRoomCounts] = useState<RoomCount>({
    livingRooms: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tải dữ liệu từ localStorage khi component mount
  useEffect(() => {
    try {
      // Tải thông tin phòng từ localStorage nếu có
      const savedLivingRooms = localStorage.getItem("livingRooms");
      const savedBedrooms = localStorage.getItem("bedrooms");
      const savedBeds = localStorage.getItem("beds");
      const savedBathrooms = localStorage.getItem("bathrooms");

      // Cập nhật state với giá trị từ localStorage hoặc giữ giá trị mặc định
      setRoomCounts({
        livingRooms: savedLivingRooms ? parseInt(savedLivingRooms, 10) : 1,
        bedrooms: savedBedrooms ? parseInt(savedBedrooms, 10) : 1,
        beds: savedBeds ? parseInt(savedBeds, 10) : 1,
        bathrooms: savedBathrooms ? parseInt(savedBathrooms, 10) : 1,
      });
    } catch (err) {
      console.error("Lỗi khi đọc dữ liệu từ localStorage:", err);
    }
  }, []);

  const updateCount = (type: keyof RoomCount, increment: number) => {
    setRoomCounts((prev) => {
      const newValue = prev[type] + increment;
      // Không cho phép giá trị âm hoặc bằng 0
      return {
        ...prev,
        [type]: newValue > 0 ? newValue : 1,
      };
    });
  };

  // Check if any value is zero
  const hasZeroValues = Object.values(roomCounts).some((value) => value === 0);

  // Animation configs
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

  const roomTypes = [
    {
      id: "livingRooms",
      name: "Phòng khách",
      icon: MdLiving,
      count: roomCounts.livingRooms,
    },
    {
      id: "bedrooms",
      name: "Phòng ngủ",
      icon: MdBed,
      count: roomCounts.bedrooms,
    },
    {
      id: "beds",
      name: "Giường",
      icon: IoBed,
      count: roomCounts.beds,
    },
    {
      id: "bathrooms",
      name: "Phòng tắm",
      icon: MdBathroom,
      count: roomCounts.bathrooms,
    },
  ];

  const handleBack = () => {
    router.push("/create/location");
  };

  const handleNext = async () => {
    if (hasZeroValues) return;

    setIsLoading(true);
    setError(null);

    try {
      // Lưu thông tin vào localStorage
      localStorage.setItem("livingRooms", roomCounts.livingRooms.toString());
      localStorage.setItem("bedrooms", roomCounts.bedrooms.toString());
      localStorage.setItem("beds", roomCounts.beds.toString());
      localStorage.setItem("bathrooms", roomCounts.bathrooms.toString());

      // Tùy chọn: Gửi dữ liệu đến backend API
      // const token = localStorage.getItem('accessToken');
      // if (token) {
      //   await axios.post(
      //     'http://localhost:3001/product/update-floor-plan',
      //     { roomCounts },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${token}`
      //       }
      //     }
      //   );
      // }

      // Chuyển đến bước tiếp theo
      router.push("/create/stand-out");
    } catch (err: any) {
      console.error("Lỗi khi lưu thông tin phòng:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi xử lý thông tin phòng"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Chia sẻ một số thông tin cơ bản về chỗ ở của bạn
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Bạn có thể thay đổi thông tin này sau và thêm những chi tiết khác mà
          khách cần biết.
        </p>
      </motion.div>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <motion.div
          className="w-full max-w-2xl mb-4 p-3 bg-red-100 text-red-700 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariant}
        initial="hidden"
        animate="show"
      >
        {roomTypes.map((roomType) => (
          <motion.div
            key={roomType.id}
            variants={itemVariant}
            className="mb-6 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-3 bg-rose-50 rounded-lg mr-4">
                  <roomType.icon className="text-2xl text-rose-500" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    {roomType.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {roomType.count}{" "}
                    {roomType.count > 1
                      ? roomType.name.toLowerCase()
                      : roomType.name.toLowerCase().replace(/s$/, "")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    roomType.count <= 1
                      ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                  }`}
                  whileHover={
                    roomType.count > 1
                      ? { scale: 1.1, backgroundColor: "#f3f4f6" }
                      : {}
                  }
                  whileTap={roomType.count > 1 ? { scale: 0.95 } : {}}
                  onClick={() =>
                    updateCount(roomType.id as keyof RoomCount, -1)
                  }
                  disabled={roomType.count <= 1}
                >
                  <FaMinus
                    className={
                      roomType.count <= 1 ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </motion.button>

                <span className="text-xl font-semibold w-6 text-center">
                  {roomType.count}
                </span>

                <motion.button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                  whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateCount(roomType.id as keyof RoomCount, 1)}
                >
                  <FaPlus className="text-gray-600" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Thông tin bổ sung */}
      <motion.div
        className="w-full max-w-2xl mt-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-start text-blue-800">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">Mẹo hữu ích</h3>
            <div className="mt-1 text-sm">
              <p>
                Khách sẽ cần biết có bao nhiêu chỗ để ngủ và các khu vực chung
                họ có thể sử dụng.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buttons điều hướng */}
      <motion.div
        className="mt-8 w-full max-w-2xl flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
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
          className={`px-6 py-3 bg-rose-500 text-white font-medium rounded-lg ${
            (hasZeroValues || isLoading) && "opacity-70 cursor-not-allowed"
          }`}
          whileHover={{
            scale: !hasZeroValues && !isLoading ? 1.05 : 1,
            backgroundColor:
              !hasZeroValues && !isLoading ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: !hasZeroValues && !isLoading ? 0.95 : 1 }}
          disabled={hasZeroValues || isLoading}
          onClick={handleNext}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Đang xử lý...</span>
            </div>
          ) : (
            "Tiếp theo"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
