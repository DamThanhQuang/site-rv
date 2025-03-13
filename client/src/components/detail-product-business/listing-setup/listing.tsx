"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import PhotoTour from "../photo-tour";
import Title from "../title";
import { motion, AnimatePresence } from "framer-motion";

export default function ListingSetup() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeContent, setActiveContent] = useState("photo-tour");

  // Extract listing ID from pathname
  const listingId = pathname.split("/")[4]; // Assuming path format is /host/dashboard/listing/[id]/...

  useEffect(() => {
    // Determine active content from pathname
    if (pathname.includes("/details/title")) {
      setActiveContent("title");
    } else {
      setActiveContent("photo-tour");
    }
  }, [pathname]);

  const handleContentChange = (contentType: string) => {
    if (contentType === "photo-tour") {
      router.push(`/host/dashboard/listing/${listingId}/details/photo-tour`);
    } else if (contentType === "title") {
      router.push(`/host/dashboard/listing/${listingId}/details/title`);
    }
    setActiveContent(contentType);
  };

  const renderRightContent = () => {
    switch (activeContent) {
      case "photo-tour":
        return <PhotoTour />;
      case "title":
        return <Title />;
      default:
        return <PhotoTour />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - This remains constant */}
        <div className="w-1/3 max-w-md border-r border-gray-200 p-6">
          <div>
            <Link
              href="/listing"
              className="inline-flex items-center text-gray-500 mb-6"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Trình chỉnh sửa mục cho thuê
            </Link>

            <div className="mb-8">
              <div className="flex space-x-2 mb-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-2 px-4 bg-gray-100 rounded-full text-sm"
                >
                  Chỗ ở cho thuê của bạn
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-2 px-4 bg-gray-100 rounded-full text-sm"
                >
                  Hướng dẫn khi khách đến
                </motion.button>
              </div>

              <motion.div
                className="border border-gray-200 rounded-lg p-4 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-start">
                  <motion.div
                    className="flex-shrink-0 h-2 w-2 mt-2 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  ></motion.div>
                  <div className="ml-4">
                    <motion.h3
                      className="font-medium"
                      initial={{ color: "#000000" }}
                      animate={{ color: "#000000" }}
                      whileHover={{ color: "#ff385c" }}
                    >
                      Hoàn thành các bước bắt buộc
                    </motion.h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Vui lòng hoàn tất các nhiệm vụ cuối cùng này để đăng mục
                      cho thuê và bắt đầu nhận yêu cầu đặt phòng.
                    </p>
                  </div>
                  <motion.div
                    className="ml-auto"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Photo Tour section - Clickable */}
              <motion.div
                className="border border-gray-200 rounded-lg p-4 mb-4 cursor-pointer"
                onClick={() => handleContentChange("photo-tour")}
                whileHover={{
                  backgroundColor: "rgba(0,0,0,0.02)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="font-medium mb-2">Tour tham quan qua ảnh</h3>
                <p className="text-sm text-gray-700">
                  1 phòng ngủ · 1 giường · 1 phòng tắm
                </p>

                <div className="mt-4 relative">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="flex">
                      <div className="relative h-32 w-32 flex-shrink-0">
                        <Image
                          src="https://a0.muscache.com/im/pictures/miso/Hosting-1371412356785196440/original/138d58a6-d4b6-4dd3-9555-123af2583d87.jpeg?im_w=240"
                          alt="Property view"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-l-lg"
                        />
                        <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded">
                          5 ảnh
                        </div>
                      </div>
                      <div className="relative h-32 w-32 flex-shrink-0 ml-1">
                        <Image
                          src="https://a0.muscache.com/im/pictures/miso/Hosting-1371412356785196440/original/138d58a6-d4b6-4dd3-9555-123af2583d87.jpeg?im_w=240"
                          alt="Another view"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-r-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Title section - Clickable */}
              <motion.div
                className="border border-gray-200 rounded-lg p-4 cursor-pointer"
                onClick={() => handleContentChange("title")}
                whileHover={{
                  backgroundColor: "rgba(0,0,0,0.02)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-sm font-medium text-gray-500">Tiêu đề</h3>
                <p className="mt-1">asdasdasd</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xem
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Content with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeContent}
            className="w-2/3 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderRightContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
