"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import { motion } from "framer-motion";

interface PhotoTourResponse {
  images: string[]; // Giả sử API trả về mảng các URL ảnh
}

const fetchImages = async (id: string): Promise<PhotoTourResponse> => {
  try {
    const token = Cookies.get("token");
    console.log("Token:", token);
    const response = await axios.get(`/business/detail-product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export default function PhotoTour() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const listingId = pathname.split("/")[4]; // Lấy ID của listing từ URL

  useEffect(() => {
    const id = params.id as string;
    fetchImages(id)
      .then((data) => {
        setImages(data.images || []);
      })
      .catch(() => setError("Lỗi khi tải ảnh"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSupplementClick = () => {
    // Khi click, trigger exit animation của container và sau đó điều hướng sang trang mới.
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(
        `/host/dashboard/listing/${listingId}/details/photo-tour/additional-photos`
      );
    }, 500); // Thời gian animation khớp với duration (0.5s)
  };

  // Variants cho container (các card) để di chuyển sang bên trái khi chuyển trang.
  const containerVariants = {
    initial: { x: 0, opacity: 1 },
    exit: {
      x: -1000,
      opacity: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  // Variants cho từng card (nếu cần hiệu ứng riêng cho từng thẻ)
  const cardVariants = {
    initial: { x: 0 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate={isTransitioning ? "exit" : "initial"}
      variants={containerVariants}
      className="mb-8"
    >
      <h1 className="text-2xl font-medium mb-6">Tour tham quan qua ảnh</h1>
      <p className="text-gray-600 mb-4">
        Quản lý ảnh và bổ sung thông tin. Khách sẽ chỉ thấy tour tham quan của
        bạn nếu mỗi phòng đều đã có ảnh.
      </p>

      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center text-black font-medium">
          <svg
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Tất cả ảnh
        </button>

        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-lg font-medium text-gray-600">Đợi tý nhé...</p>
          <p className="text-sm text-gray-500 mt-2">Đang tải dữ liệu...</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 p-4 bg-red-50 rounded-md border border-red-200">
          {error}
        </p>
      )}

      {!loading && !error && (
        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={containerVariants}
          initial="initial"
          animate={isTransitioning ? "exit" : "initial"}
        >
          {/* Card Phòng ngủ */}
          <motion.div
            variants={cardVariants}
            className="rounded-lg flex flex-col items-center hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
              <Image
                src="https://a0.muscache.com/im/pictures/540ca95a-2c58-4c49-8ef5-fd64060280da.jpg?im_w=720"
                alt="Bedroom"
                layout="fill"
                objectFit="cover"
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium mb-1">Phòng ngủ</h3>
            <p className="text-sm text-gray-500 mb-2">Thêm ảnh</p>
          </motion.div>

          {/* Card Phòng tắm */}
          <motion.div
            variants={cardVariants}
            className="rounded-lg flex flex-col items-center hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
              <Image
                src="https://a0.muscache.com/im/pictures/51c92070-ccc1-4a88-a2ca-61ee59d1e6a0.jpg?im_w=720"
                alt="Bathroom"
                layout="fill"
                objectFit="cover"
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium mb-1">Phòng tắm đầy đủ</h3>
            <p className="text-sm text-gray-500 mb-2">Thêm ảnh</p>
          </motion.div>

          {/* Card Ảnh bổ sung (click để chuyển trang) */}
          <motion.div
            variants={cardVariants}
            className="rounded-lg flex flex-col items-center hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={handleSupplementClick}
          >
            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
              <Image
                src={images[0] || "https://via.placeholder.com/240"}
                alt="Ảnh bổ sung"
                layout="fill"
                objectFit="cover"
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium mb-1">Ảnh bổ sung</h3>
            <p className="text-sm text-gray-500 mb-2">5 ảnh</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
