"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LuHouse } from "react-icons/lu";
import { MdOutlineBedroomParent, MdOutlineMeetingRoom } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function PrivacyType() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    {
      id: "entire_place",
      icon: LuHouse,
      name: "Toàn bộ nhà",
      description: "Khách được sử dụng riêng toàn bộ chỗ ở này.",
    },
    {
      id: "private_room",
      icon: MdOutlineBedroomParent,
      name: "Phòng riêng",
      description: "Khách có phòng riêng để ngủ và một số khu vực chung.",
    },
    {
      id: "shared_room",
      icon: MdOutlineMeetingRoom,
      name: "Phòng chung",
      description: "Khách ngủ trong một không gian mà người khác cũng sử dụng.",
    },
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

  // ham chuyen trang
  const handleNext = () => {
    if (!selected) return;

    setIsLoading(true);

    try {
      //Luu lua chon vao localStorage de dung o cac buoc sau
      localStorage.setItem("privacyType", selected);
      router.push("/create/location");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data.message || "Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/create/structure");
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
          Khách sẽ được sử dụng loại chỗ ở nào?
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col w-full gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {options.map((option) => (
          <motion.div key={option.id} variants={item}>
            <motion.button
              className={`w-full p-4 border ${
                selected === option.id
                  ? "border-2 border-rose-500"
                  : "border-gray-300"
              } rounded-xl transition-all`}
              whileHover={{
                scale: 1.02,
                borderColor: selected === option.id ? "#f43f5e" : "#111827",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2
                    className={`text-lg font-semibold mb-1 ${
                      selected === option.id ? "text-rose-500" : ""
                    }`}
                  >
                    {option.name}
                  </h2>
                  <div className="text-gray-600">{option.description}</div>
                </div>
                <div
                  className={`text-4xl ml-4 ${
                    selected === option.id ? "text-rose-500" : "text-gray-600"
                  }`}
                >
                  <option.icon />
                </div>
                {selected === option.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-4 h-4 bg-rose-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons điều hướng */}
      <motion.div
        className="mt-12 w-full flex justify-between"
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
          className={`px-6 py-3 bg-rose-500 text-white font-medium rounded-lg ${
            !selected && "opacity-70 cursor-not-allowed"
          }`}
          whileHover={{
            scale: selected ? 1.05 : 1,
            backgroundColor: selected ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: selected ? 0.95 : 1 }}
          disabled={!selected}
          onClick={handleNext}
        >
          {isLoading ? "Đang tải..." : "Tiếp theo"}
        </motion.button>
      </motion.div>
    </div>
  );
}
