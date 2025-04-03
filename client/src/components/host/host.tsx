"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import {
  FaRegMoneyBillAlt,
  FaGlobeAmericas,
  FaRegCalendarAlt,
  FaShieldAlt,
  FaRegLightbulb,
  FaChevronRight,
  FaChevronDown,
  FaStar,
  FaCheck,
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HostHomesLandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkBusinessRole = async () => {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");

      if (!token || !userId) {
        // User not logged in, show landing page
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if user has business role
        if (response.data && response.data.role === "business") {
          // User is already a business owner, redirect to business dashboard
          router.push("/host/dashboard/today");
        } else {
          // User doesn't have business role, show landing page
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to check user role:", error);
        setIsLoading(false);
      }
    };

    checkBusinessRole();
  }, [router]);

  const handleStartButtonClick = async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    // If user is not logged in, redirect to login
    if (!token || !userId) {
      router.push("/login");
      return;
    }

    setIsButtonLoading(true);
    try {
      const response = await axios.get(`user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Navigate based on user role
      if (response.data && response.data.role === "business") {
        router.push("/host/dashboard/today");
      } else {
        router.push("/register-business");
      }
    } catch (error) {
      console.error("Failed to check user role:", error);
      // If there's an error, default to register-business
      router.push("/register-business");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Show loading state while checking role
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-rose-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 relative mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin absolute"></div>
            <div className="w-12 h-12 border-4 border-indigo-200 border-b-indigo-500 rounded-full animate-spin absolute top-2 left-2"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium text-lg">
            Đang tải trang chủ nhà...
          </p>
          <p className="text-gray-500 text-sm mt-2">Chỉ mất vài giây</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section with better design and parallax effect */}
      <div
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6"
            variants={fadeIn}
          >
            Hơn 10,000 chủ nhà đã tham gia cùng chúng tôi
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            variants={fadeIn}
          >
            Biến không gian của bạn thành nguồn thu nhập
          </motion.h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl font-light max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Tham gia cộng đồng chủ nhà và bắt đầu kiếm thêm thu nhập từ không
            gian chưa được tận dụng.
          </motion.p>

          <motion.div className="mt-10" variants={fadeIn}>
            <button
              onClick={handleStartButtonClick}
              className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-full font-semibold text-lg shadow-xl hover:shadow-rose-500/30 transition-all duration-300 transform hover:-translate-y-1"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                <span>Bắt đầu hành trình</span>
              )}
            </button>

            <p className="mt-4 text-sm text-white/80">
              Đăng ký làm chủ nhà chỉ mất 10 phút
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="text-white text-sm font-medium mb-2">Cuộn xuống</p>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 via-white to-rose-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-4xl md:text-5xl font-bold text-rose-500">
                5M+
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                Đặt phòng hàng năm
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-4xl md:text-5xl font-bold text-rose-500">
                150+
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                Quốc gia và vùng lãnh thổ
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-4xl md:text-5xl font-bold text-rose-500">
                $8.700
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                Thu nhập trung bình/tháng
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-4xl md:text-5xl font-bold text-rose-500">
                4.8/5
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                Đánh giá trung bình
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Lý do nên trở thành chủ nhà
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Khám phá những lợi ích tuyệt vời khi tham gia cộng đồng chủ nhà
              của chúng tôi
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-50"
              variants={fadeIn}
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-6">
                <FaRegMoneyBillAlt size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Thu nhập thụ động linh hoạt
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Biến không gian dư thừa thành nguồn thu nhập ổn định. Chủ nhà
                trung bình kiếm được 8.700$ mỗi tháng.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Tự quyết định giá cho thuê
                  </span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Thanh toán nhanh chóng, an toàn
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-50"
              variants={fadeIn}
            >
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center mb-6">
                <FaGlobeAmericas size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Gặp gỡ khách du lịch quốc tế
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Kết nối với du khách từ khắp nơi trên thế giới, mở rộng mạng
                lưới và tạo dựng trải nghiệm văn hóa đa dạng.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Du khách từ 150+ quốc gia
                  </span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Bộ lọc khách hàng an toàn
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-50"
              variants={fadeIn}
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-6">
                <FaRegCalendarAlt size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Quyền tự chủ & Linh hoạt
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Thiết lập lịch trình cho thuê theo cách riêng của bạn. Hoàn toàn
                linh hoạt và kiểm soát trải nghiệm của khách.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Quản lý lịch trình linh hoạt
                  </span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Hỗ trợ 24/7 từ đội ngũ chuyên viên
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Làm chủ nhà dễ dàng chỉ với 3 bước
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Quy trình đơn giản giúp bạn bắt đầu kinh doanh nhanh chóng
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500"></div>

              {/* Process Steps */}
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-rose-500 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-rose-200">
                    <span className="text-2xl font-bold text-rose-500">1</span>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3 text-center">
                      Đăng ký và mô tả nơi ở
                    </h3>
                    <p className="text-gray-600 text-center">
                      Đăng ký và điền thông tin cơ bản về không gian cho thuê
                      của bạn - loại hình, vị trí và tiện nghi.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-pink-500 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-pink-200">
                    <span className="text-2xl font-bold text-pink-500">2</span>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3 text-center">
                      Thêm ảnh và giá phòng
                    </h3>
                    <p className="text-gray-600 text-center">
                      Đăng tải hình ảnh chất lượng cao và thiết lập giá cả cạnh
                      tranh. Chúng tôi có công cụ hỗ trợ định giá thông minh.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-rose-500 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-rose-200">
                    <span className="text-2xl font-bold text-rose-500">3</span>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3 text-center">
                      Đón nhận khách đầu tiên
                    </h3>
                    <p className="text-gray-600 text-center">
                      Nhận đặt phòng đầu tiên, đón tiếp khách, và bắt đầu nhận
                      thu nhập. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp
                      đỡ.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Câu chuyện từ chủ nhà
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Khám phá trải nghiệm thực tế từ các chủ nhà đã thành công
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-white to-rose-50 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="italic text-gray-700 mb-6 leading-relaxed">
                "Tôi có thể trang trải toàn bộ chi phí thế chấp ngôi nhà của
                mình nhờ cho thuê căn hộ phụ. Nền tảng rất dễ sử dụng và khách
                hàng thực sự tuyệt vời."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt="Host"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Nguyễn Thu Hà</h4>
                  <p className="text-sm text-gray-600">
                    Chủ nhà tại Hà Nội - 2 năm
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="italic text-gray-700 mb-6 leading-relaxed">
                "Cho thuê biệt thự của tôi khi tôi đi công tác đã tạo ra nguồn
                thu nhập bất ngờ. Khách hàng quốc tế đã mang lại cho tôi nhiều
                kết nối và tình bạn mới."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://i.pravatar.cc/150?img=68"
                    alt="Host"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Trần Minh Tuấn</h4>
                  <p className="text-sm text-gray-600">
                    Chủ nhà tại Đà Nẵng - 3 năm
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-pink-50 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="italic text-gray-700 mb-6 leading-relaxed">
                "Tôi cho thuê căn nhà nhỏ trong khu vườn và hiện đang có thu
                nhập đủ để trang trải cho chuyến du lịch hàng năm. Nền tảng này
                đã thay đổi cuộc sống của tôi."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Host"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Lê Thanh Mai</h4>
                  <p className="text-sm text-gray-600">
                    Chủ nhà tại Hội An - 1 năm
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Support Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 via-white to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80"
                alt="Support Team"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Chúng tôi luôn bảo vệ bạn
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Với hệ thống bảo vệ toàn diện và đội ngũ hỗ trợ 24/7, bạn có thể
                yên tâm khi trở thành chủ nhà.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Bảo hiểm chủ nhà miễn phí
                    </h3>
                    <p className="text-gray-600">
                      Mỗi chủ nhà đều được bảo hiểm miễn phí lên đến $1,000,000
                      để bảo vệ tài sản của bạn.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaRegLightbulb className="text-rose-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Hỗ trợ 24/7 chuyên nghiệp
                    </h3>
                    <p className="text-gray-600">
                      Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giúp đỡ bạn mọi
                      lúc, mọi nơi.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartButtonClick}
                className="mt-8 inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors"
              >
                Tìm hiểu thêm
                <FaChevronRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tìm hiểu thêm về việc trở thành chủ nhà
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Tôi cần làm gì để trở thành chủ nhà?",
                answer:
                  "Để bắt đầu, bạn chỉ cần đăng ký tài khoản, cung cấp thông tin về chỗ ở của bạn (loại hình, vị trí, tiện nghi), đăng tải hình ảnh chất lượng cao và thiết lập giá cả. Quy trình đơn giản và chúng tôi có hướng dẫn chi tiết cho từng bước.",
              },
              {
                question: "Tôi có thể kiếm được bao nhiêu tiền?",
                answer:
                  "Thu nhập phụ thuộc vào nhiều yếu tố như vị trí, loại hình chỗ ở, mùa du lịch và dịch vụ bạn cung cấp. Trung bình, chủ nhà tại Việt Nam kiếm được khoảng 5-15 triệu đồng mỗi tháng. Chúng tôi có công cụ ước tính thu nhập để bạn tham khảo.",
              },
              {
                question: "Tôi có được bảo vệ khi cho thuê không?",
                answer:
                  "Tất nhiên! Chúng tôi cung cấp bảo hiểm chủ nhà miễn phí lên đến $1,000,000, hệ thống xác minh khách hàng, và đội ngũ hỗ trợ 24/7 để bảo vệ bạn và tài sản của bạn.",
              },
              {
                question: "Tôi có thể cho thuê căn hộ chung cư không?",
                answer:
                  "Điều này phụ thuộc vào quy định của tòa nhà và địa phương của bạn. Trước khi đăng ký, hãy kiểm tra hợp đồng thuê nhà hoặc quy định của ban quản lý chung cư để đảm bảo việc cho thuê ngắn hạn được phép.",
              },
              {
                question: "Phí sử dụng nền tảng là bao nhiêu?",
                answer:
                  "Chúng tôi thu phí dịch vụ 3% trên mỗi đặt phòng thành công. Không có phí đăng ký hay phí duy trì hàng tháng, bạn chỉ trả phí khi kiếm được tiền.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className={`w-full text-left p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors ${
                    activeAccordion === index ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {faq.question}
                    </h3>
                    <FaChevronDown
                      className={`transform transition-transform ${
                        activeAccordion === index ? "rotate-180" : ""
                      } text-gray-600`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? "max-h-96 py-4 px-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with better design */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Sẵn sàng bắt đầu hành trình làm chủ nhà?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-10 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Đăng ký ngay hôm nay và nhận ưu đãi đặc biệt dành cho chủ nhà mới
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleStartButtonClick}
                className="px-8 py-4 bg-white text-rose-600 hover:bg-gray-100 rounded-full font-semibold text-lg shadow-xl"
                disabled={isButtonLoading}
              >
                {isButtonLoading ? "Đang xử lý..." : "Đăng ký làm chủ nhà"}
              </button>

              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-semibold text-lg"
              >
                Liên hệ với chúng tôi
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cách thức hoạt động
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Nhà đầu tư
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Cộng đồng</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Forum
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Câu chuyện chủ nhà
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sự kiện
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    An toàn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    COVID-19
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-400">support@coang.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-400">+84 123 456 789</span>
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Coang, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
