"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BecomeAHost() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/create/about-your-place");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.main
      className="flex flex-col max-w-6xl mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full pr-0">
        <div className="flex flex-col space-y-8">
          <motion.div
            className="flex flex-col justify-center mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Bắt đầu trên Airbnb thật dễ dàng
            </h1>
          </motion.div>

          <div className="space-y-12">
            {/* Bước 1 */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
                </h2>
                <p className="text-gray-600">
                  Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho
                  thuê và số lượng khách có thể ở tại đó.
                </p>
              </div>
              <motion.div
                className="w-full md:w-48 lg:w-64 mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                  alt="Bước 1: Chia sẻ thông tin"
                />
              </motion.div>
            </motion.div>

            {/* Bước 2 */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Làm cho nhà/phòng cho thuê trở nên nổi bật
                </h2>
                <p className="text-gray-600">
                  Thêm từ 5 ảnh trở lên cùng với tiêu đề và nội dung mô tả –
                  chúng tôi sẽ giúp bạn thực hiện.
                </p>
              </div>
              <motion.div
                className="w-full md:w-48 lg:w-64 mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                  alt="Bước 2: Làm cho nhà/phòng nổi bật"
                />
              </motion.div>
            </motion.div>

            {/* Bước 3 */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Hoàn thiện và đăng mục cho thuê
                </h2>
                <p className="text-gray-600">
                  Chọn giá khởi điểm, xác minh một vài thông tin, sau đó đăng
                  mục cho thuê của bạn.
                </p>
              </div>
              <motion.div
                className="w-full md:w-48 lg:w-64 mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                  alt="Bước 3: Hoàn thiện và đăng"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Panel with animated button */}
      <motion.div
        className="mt-12 max-w-md mx-auto w-full md:max-w-lg bg-gray-50 rounded-xl p-6 shadow-sm"
        variants={itemVariants}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="text-center">
          <motion.button
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            onClick={handleGetStarted}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Bắt đầu ngay
          </motion.button>
        </div>
      </motion.div>
    </motion.main>
  );
}
