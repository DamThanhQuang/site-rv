"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaInfoCircle, FaChartLine, FaCoins } from "react-icons/fa";
import { MdOutlineCabin, MdAttachMoney } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";

export default function Price() {
  const router = useRouter();
  const [price, setPrice] = useState<string>("1023584");
  const [isFocused, setIsFocused] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);

  // Format price as VND currency
  const formatCurrency = (value: string): string => {
    const numberValue = value.replace(/\D/g, "");
    if (!numberValue) return "";
    return new Intl.NumberFormat("vi-VN").format(parseInt(numberValue));
  };

  // For displaying formatted price
  const formattedPrice = formatCurrency(price);

  // Calculate guest price (add ~14% for fees)
  const guestPrice = price
    ? Math.round(parseInt(price.replace(/\D/g, "")) * 1.14)
    : 0;
  const formattedGuestPrice = formatCurrency(guestPrice.toString());

  // Handle price change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPrice(value);
    setIsPriceValid(parseInt(value) >= 100000); // Ensure price is at least 100,000₫
  };

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

  // Suggested price ranges
  const suggestedPrices = [
    { label: "Thấp", value: "479806", description: "Ít đặt phòng hơn" },
    { label: "Đề xuất", value: "654053", description: "Cân bằng tốt" },
    { label: "Cao", value: "1023584", description: "Ít đặt phòng hơn" },
  ];

  const handleBack = () => {
    router.push("/create/finish-setup");
  };

  const handleNext = () => {
    if (isPriceValid) {
      router.push("/create/receipt");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Bây giờ, hãy đặt mức giá mà bạn muốn
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Bạn có thể thay đổi giá này bất cứ lúc nào.
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

        {/* Price input */}
        <motion.div variants={itemVariant} className="mb-8">
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            Giá mỗi đêm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg font-medium">₫</span>
            </div>
            <input
              type="text"
              id="price"
              value={formattedPrice}
              onChange={handlePriceChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full pl-10 pr-4 py-5 text-2xl font-medium border rounded-lg transition-all ${
                isFocused
                  ? "border-rose-500 ring-2 ring-rose-100"
                  : !isPriceValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          {!isPriceValid && (
            <p className="mt-2 text-red-500 text-sm">
              Giá phải ít nhất 100.000₫ mỗi đêm
            </p>
          )}

          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Giá cho khách (trước thuế)</span>
              <span className="font-medium">₫{formattedGuestPrice}</span>
            </div>
          </div>
        </motion.div>

        {/* Market comparison */}
        <motion.div variants={itemVariant} className="mb-8">
          <div className="flex items-center mb-3">
            <FaChartLine className="text-rose-500 mr-2" />
            <h3 className="text-lg font-medium">So sánh thị trường</h3>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <IoMdTrendingUp className="text-green-600 mr-2" />
              <span>
                Nhà/phòng cho thuê tương tự:{" "}
                <strong>₫479.806 – ₫654.053</strong>
              </span>
            </div>

            {/* Price range slider visualization */}
            <div className="relative h-2 bg-gray-200 rounded-full my-6">
              <div className="absolute h-full w-3/5 bg-rose-500 rounded-full left-1/5"></div>
              <div className="absolute -top-1 left-1/5 h-4 w-4 bg-gray-100 border-2 border-rose-500 rounded-full"></div>
              <div className="absolute -top-1 left-[45%] h-4 w-4 bg-gray-100 border-2 border-rose-500 rounded-full"></div>
              <div className="absolute -top-1 left-4/5 h-4 w-4 bg-gray-100 border-2 border-rose-500 rounded-full"></div>
            </div>

            {/* Price suggestions */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {suggestedPrices.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setPrice(item.value)}
                  className={`cursor-pointer p-3 rounded-lg border transition-all ${
                    price === item.value
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-lg">₫{formatCurrency(item.value)}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-2 flex items-center text-rose-600 text-sm font-medium">
            <FaInfoCircle className="mr-1" />
            Tìm hiểu thêm về định giá
          </button>
        </motion.div>

        {/* Pricing tips */}
        <motion.div variants={itemVariant} className="mb-10">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start">
              <FaCoins className="text-blue-500 mr-3 mt-1" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  Lời khuyên định giá:
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>
                    • Giá khởi đầu thấp hơn có thể giúp bạn nhận được đánh giá
                    đầu tiên nhanh hơn
                  </li>
                  <li>
                    • Bạn luôn có thể thay đổi giá hoặc thiết lập giá cuối
                    tuần/theo mùa khác nhau
                  </li>
                  <li>
                    • Giảm giá cho đặt phòng dài ngày có thể tăng tỷ lệ đặt
                    phòng và giảm công việc vệ sinh
                  </li>
                </ul>
              </div>
            </div>
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
        >
          Quay lại
        </motion.button>
        <motion.button
          className={`px-6 py-3 bg-rose-500 text-white font-medium rounded-lg ${
            !isPriceValid && "opacity-70 cursor-not-allowed"
          }`}
          whileHover={{
            scale: isPriceValid ? 1.05 : 1,
            backgroundColor: isPriceValid ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: isPriceValid ? 0.95 : 1 }}
          disabled={!isPriceValid}
          onClick={handleNext}
        >
          Tiếp theo
        </motion.button>
      </motion.div>
    </div>
  );
}
