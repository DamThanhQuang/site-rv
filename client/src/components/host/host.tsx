"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";

export default function HostHomesLandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

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
        // Fix the API endpoint here too
        const response = await axios.get(`user/${userId}`, {
          // Changed from user/${userId}
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
      // Fix the API endpoint - the most common issue is path format
      const response = await axios.get(`users/${userId}`, {
        // Changed from user/${userId}
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

  // Show loading state while checking role
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.brimco.io/wp-content/uploads/2023/09/Understanding-the-Travel-and-Tourism-Sector.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Nội dung hero */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Chào mừng đến với Coang12345
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Hãy trở thành chủ nhà và bắt đầu hành trình kinh doanh độc đáo của
            bạn.
          </p>
          <button
            onClick={handleStartButtonClick}
            className="mt-8 inline-block px-8 py-3 bg-red-500 hover:bg-red-600 rounded-full font-semibold"
            disabled={isButtonLoading}
          >
            {isButtonLoading ? (
              <span>Đang xử lý...</span>
            ) : (
              <span>Bắt đầu ngay</span>
            )}
          </button>
        </div>
      </header>

      {/* Section Giới thiệu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">
            Tại sao trở thành chủ nhà Coang123?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Khám phá những lợi ích tuyệt vời khi tham gia cộng đồng chủ nhà
            Coang.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-xl font-semibold">Kiếm thêm thu nhập</h3>
              <p className="mt-2 text-gray-600">
                Tận dụng không gian trống của bạn để tạo nguồn thu nhập ổn định.
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-xl font-semibold">Gặp gỡ khách quốc tế</h3>
              <p className="mt-2 text-gray-600">
                Kết nối với khách hàng từ khắp nơi trên thế giới và mở rộng giao
                lưu văn hóa.
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-xl font-semibold">Tự chủ & Linh hoạt</h3>
              <p className="mt-2 text-gray-600">
                Quản lý thời gian và không gian theo cách riêng của bạn, thuận
                tiện và linh hoạt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Đăng ký/Đăng nhập */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Sẵn sàng tham gia?</h2>
          <p className="mt-4 text-gray-600">
            Đăng ký hoặc đăng nhập để bắt đầu trải nghiệm ngay hôm nay.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={handleStartButtonClick}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
