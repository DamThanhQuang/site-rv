"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaParking,
  FaHotTub,
  FaUmbrellaBeach,
  FaFireExtinguisher,
  FaFirstAid,
  FaSmokingBan,
  FaDumbbell,
} from "react-icons/fa";
import {
  MdOutdoorGrill,
  MdOutlineDeck,
  MdOutlinePiano,
  MdLocalLaundryService,
  MdKitchen,
  MdPool,
  MdOutlineFireplace,
  MdBeachAccess,
} from "react-icons/md";
import { GiCampfire, GiSkis } from "react-icons/gi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { GiShower } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { RiBilliardsFill } from "react-icons/ri";

type AmenityCategory = {
  title: string;
  description: string;
  amenities: {
    id: string;
    name: string;
    icon: React.ElementType;
  }[];
};

export default function Amenity() {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    try {
      const savedAmenities = localStorage.getItem("amenities");
      if (savedAmenities) {
        const amenityArray = JSON.parse(savedAmenities);
        setSelectedAmenities(new Set(amenityArray));
      }
    } catch (err) {
      console.error("Lỗi khi đọc tiện nghi từ localStorage:", err);
    }
  }, []);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } },
  };

  const categoryVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  const amenityCategories: AmenityCategory[] = [
    {
      title: "Còn những tiện nghi yêu thích của khách sau đây thì sao?",
      description: "Những tiện nghi phổ biến mà khách thường tìm kiếm",
      amenities: [
        { id: "wifi", name: "Wi-fi", icon: FaWifi },
        { id: "tv", name: "TV", icon: FaTv },
        { id: "kitchen", name: "Bếp", icon: MdKitchen },
        { id: "washer", name: "Máy giặt", icon: MdLocalLaundryService },
        {
          id: "free-parking",
          name: "Chỗ đỗ xe miễn phí tại nơi ở",
          icon: FaParking,
        },
        {
          id: "paid-parking",
          name: "Chỗ đỗ xe có thu phí trong khuôn viên",
          icon: FaParking,
        },
        {
          id: "air-conditioning",
          name: "Điều hòa nhiệt độ",
          icon: FaSnowflake,
        },
        {
          id: "workspace",
          name: "Không gian riêng để làm việc",
          icon: MdOutlineDeck,
        },
      ],
    },
    {
      title: "Bạn có tiện nghi nào nổi bật không?",
      description: "Những tiện nghi làm nổi bật chỗ ở của bạn",
      amenities: [
        { id: "pool", name: "Bể bơi", icon: MdPool },
        { id: "hot-tub", name: "Bồn tắm nước nóng", icon: FaHotTub },
        { id: "yard", name: "Sân", icon: MdOutlineDeck },
        { id: "bbq-grill", name: "Lò nướng BBQ", icon: MdOutdoorGrill },
        {
          id: "outdoor-dining",
          name: "Khu vực ăn uống ngoài trời",
          icon: MdOutlineDeck,
        },
        { id: "fire-pit", name: "Bếp đốt lửa trại", icon: GiCampfire },
        { id: "pool-table", name: "Bàn bi-da", icon: RiBilliardsFill },
        {
          id: "indoor-fireplace",
          name: "Lò sưởi trong nhà",
          icon: MdOutlineFireplace,
        },
        { id: "piano", name: "Đàn piano", icon: MdOutlinePiano },
        { id: "gym", name: "Thiết bị tập thể dục", icon: FaDumbbell },
        { id: "lake-access", name: "Lối ra hồ", icon: MdBeachAccess },
        { id: "beach-access", name: "Lối ra bãi biển", icon: FaUmbrellaBeach },
        {
          id: "ski-in-out",
          name: "Đường trượt tuyết thẳng tới cửa",
          icon: GiSkis,
        },
        {
          id: "outdoor-shower",
          name: "Vòi sen tắm ngoài trời",
          icon: GiShower,
        },
      ],
    },
    {
      title:
        "Bạn có tiện nghi nào trong số những tiện nghi đảm bảo an toàn sau đây không?",
      description: "Những thiết bị đảm bảo an toàn cho khách",
      amenities: [
        { id: "smoke-alarm", name: "Máy báo khói", icon: FaSmokingBan },
        { id: "first-aid", name: "Bộ sơ cứu", icon: FaFirstAid },
        {
          id: "fire-extinguisher",
          name: "Bình chữa cháy",
          icon: FaFireExtinguisher,
        },
        {
          id: "co-alarm",
          name: "Máy phát hiện khí CO",
          icon: TbDeviceAnalytics,
        },
      ],
    },
  ];

  const handleNext = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Chuyển Set thành mảng để lưu vào localStorage
      const amenitiesArray = Array.from(selectedAmenities);

      // Lưu vào localStorage
      localStorage.setItem("amenities", JSON.stringify(amenitiesArray));

      // Tùy chọn: Gửi dữ liệu đến backend API
      // const token = localStorage.getItem('accessToken');
      // if (token) {
      //   await axios.post(
      //     'http://localhost:3001/product/update-amenities',
      //     { amenities: amenitiesArray },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${token}`
      //       }
      //     }
      //   );
      // }

      // Chuyển đến bước tiếp theo
      router.push("/create/photo");
    } catch (err: any) {
      console.error("Lỗi khi lưu tiện nghi:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi xử lý tiện nghi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Lưu trạng thái hiện tại trước khi quay lại
    localStorage.setItem(
      "amenities",
      JSON.stringify(Array.from(selectedAmenities))
    );
    router.push("/create/stand-out");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Cho khách biết chỗ ở của bạn có những gì?
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Bạn có thể thêm tiện nghi sau khi đăng.
        </p>
      </motion.div>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <motion.div
          className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="w-full mb-10"
      >
        {amenityCategories.map((category, categoryIndex) => (
          <motion.section
            key={categoryIndex}
            variants={categoryVariant}
            className="mb-10"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {category.title}
              </h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.amenities.map((amenity) => (
                <motion.div
                  key={amenity.id}
                  variants={itemVariant}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAmenities.has(amenity.id)
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => toggleAmenity(amenity.id)}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        selectedAmenities.has(amenity.id)
                          ? "bg-rose-100 text-rose-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <amenity.icon className="text-xl" />
                    </div>
                    <span className="flex-grow">{amenity.name}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedAmenities.has(amenity.id)
                          ? "border-rose-500 bg-rose-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedAmenities.has(amenity.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>

      {/* Số tiện nghi đã chọn */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="font-medium">
          {selectedAmenities.size} tiện nghi đã chọn
        </span>
      </motion.div>

      {/* Buttons điều hướng */}
      <motion.div
        className="mt-8 w-full flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
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
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          whileHover={{
            scale: isLoading ? 1 : 1.05,
            backgroundColor: isLoading ? undefined : "#e11d48",
          }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          onClick={handleNext}
          disabled={isLoading}
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
