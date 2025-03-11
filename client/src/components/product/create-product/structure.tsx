"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LuHouse, LuBuilding, LuWarehouse } from "react-icons/lu";
import {
  MdOutlineCabin,
  MdOutlineApartment,
  MdOutlineVilla,
} from "react-icons/md";
import { TbCaravan } from "react-icons/tb";
import { FaCaravan, FaUmbrellaBeach } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Structure() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    { id: "house", icon: LuHouse, name: "Nhà" },
    { id: "apartment", icon: MdOutlineApartment, name: "Căn hộ" },
    { id: "guesthouse", icon: LuBuilding, name: "Nhà khách" },
    { id: "hotel", icon: MdOutlineVilla, name: "Khách sạn" },
    { id: "cabin", icon: MdOutlineCabin, name: "Nhà gỗ" },
    { id: "camping", icon: TbCaravan, name: "Khu cắm trại" },
    { id: "boat", icon: FaCaravan, name: "Nhà thuyền" },
    { id: "beach", icon: FaUmbrellaBeach, name: "Nhà trên bãi biển" },
    { id: "warehouse", icon: LuWarehouse, name: "Nhà kho" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  const handleNext = async () => {
    if (!selected) return;

    setIsLoading(true);

    try {
      // Lưu lựa chọn vào localStorage để dùng ở các bước sau
      localStorage.setItem("propertyType", selected);

      // Chuyển đến bước tiếp theo
      router.push("/create/privacy-type");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/create/about-your-place");
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
          Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
        </h1>
      </motion.div>
      <motion.div
        className="flex flex-wrap justify-center w-full gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {options.map((option) => (
          <motion.div
            key={option.id}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)]"
            variants={item}
          >
            <motion.button
              className={`w-full p-4 border ${
                selected === option.id
                  ? "border-2 border-rose-500"
                  : "border-gray-300"
              } rounded-xl flex flex-col items-center h-32 justify-center`}
              whileHover={{
                scale: 1.03,
                borderColor: selected === option.id ? "#f43f5e" : "#111827",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(option.id)}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                <option.icon
                  className={selected === option.id ? "text-rose-500" : ""}
                />
              </motion.div>
              <div
                className={`font-medium ${
                  selected === option.id ? "text-rose-500" : ""
                }`}
              >
                {option.name}
              </div>
              {selected === option.id && (
                <motion.div
                  className="absolute top-2 right-2 w-4 h-4 bg-rose-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 rounded-md w-full text-center">
          {error}
        </div>
      )}
      {/* Buttons điều hướng */}
      <motion.div
        className="mt-12 w-full flex justify-between"
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
            (!selected || isLoading) && "opacity-70 cursor-not-allowed"
          }`}
          whileHover={{
            scale: selected && !isLoading ? 1.05 : 1,
            backgroundColor: selected ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: selected && !isLoading ? 0.95 : 1 }}
          disabled={!selected || isLoading}
          onClick={handleNext}
        >
          {isLoading ? "Đang xử lý..." : "Tiếp theo"}
        </motion.button>
      </motion.div>
    </div>
  );
}
