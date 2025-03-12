"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function List() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8 md:p-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Nhà/Phòng cho thuê của bạn
          </h1>
          <p className="mt-3 text-gray-600 text-lg md:text-xl max-w-2xl">
            Quản lý và theo dõi tất cả các căn hộ, nhà và phòng cho thuê của bạn
            tại đây
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-100"
        >
          <div className="mb-6 w-full overflow-hidden rounded-xl">
            <img
              src="https://a0.muscache.com/pictures/87444596-1857-4437-9667-4f9cb4f5baf2.jpg"
              alt="home"
              className="w-full h-56 md:h-72 object-cover rounded-xl transform transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              Bạn chưa có mục cho thuê nào
            </h2>
            <p className="text-gray-600 md:text-lg mb-8 max-w-md">
              Tạo mục cho thuê với Airbnb Setup để bắt đầu nhận yêu cầu đặt
              phòng và kiếm thu nhập từ ngôi nhà của bạn.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/host/become-host"
                className="inline-block px-8 py-4 bg-rose-500 text-white text-lg font-semibold rounded-full hover:bg-rose-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Bắt đầu ngay
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-gray-500"
        >
          <p>
            Bạn cần hỗ trợ?{" "}
            <a href="/help" className="text-blue-500 hover:underline">
              Xem hướng dẫn
            </a>
          </p>
        </motion.div>
      </section>
    </>
  );
}
