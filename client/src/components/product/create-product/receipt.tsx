"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCheck, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { MdOutlineCabin, MdPreview, MdEdit } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export default function Receipt() {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    propertyType: "",
    price: 0,
    discountedPrice: 0,
    location: { address: "", city: "", country: "" },
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    images: [""],
    isNew: true,
    livingRooms: 0,
    amenities: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    try {
      const data = {
        title: localStorage.getItem("title") || "Nhà của bạn",
        propertyType: localStorage.getItem("propertyType") || "Căn hộ",
        price: Number(localStorage.getItem("price") || 0),
        discountedPrice: Number(localStorage.getItem("discountedPrice") || 0),
        location: JSON.parse(
          localStorage.getItem("location") ||
            '{"address": "Chưa cập nhật", "city": "Chưa cập nhật", "country": "Việt Nam"}'
        ),
        beds: Number(localStorage.getItem("beds") || 1),
        bedrooms: Number(localStorage.getItem("bedrooms") || 1),
        bathrooms: Number(localStorage.getItem("bathrooms") || 1),
        images: JSON.parse(localStorage.getItem("images") || '[""]'),
        livingRooms: Number(localStorage.getItem("livingRooms") || 1),
        amenities: JSON.parse(localStorage.getItem("amenities") || "[]"),
        isNew: true,
      };

      setProductData(data);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
    }
  }, []);

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

  // Format price as VND currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const handleBack = () => {
    router.push("/create/price");
  };

  const handleNext = () => {
    router.push("/create/publish-celebration");
  };

  // Xử lý chỉnh sửa các trường
  const handleEdit = (section: string) => {
    switch (section) {
      case "title":
        router.push("/create/title");
        break;
      case "photos":
        router.push("/create/photos");
        break;
      case "price":
        router.push("/create/price");
        break;
      case "amenities":
        router.push("/create/amenities");
        break;
      case "location":
        router.push("/create/location");
        break;
      default:
        router.push("/create/about-your-place");
    }
  };

  // Tính toán số lượng nhiệm vụ đã hoàn thành
  const completedTasks = [
    productData.images && productData.images.length >= 5,
    productData.price > 0,
    productData.title && productData.title.trim() !== "",
    productData.amenities && productData.amenities.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Xem lại mục cho thuê của bạn
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Dưới đây là những thông tin mà chúng tôi sẽ hiển thị cho khách. Hãy
          đảm bảo mọi thứ đều ổn thỏa.
        </p>
      </motion.div>

      {!isDataLoaded ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Đang tải thông tin...</span>
        </div>
      ) : (
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          {/* Listing preview card */}
          <motion.div
            variants={itemVariant}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-10"
          >
            {/* Header with property type */}
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <MdOutlineCabin className="text-2xl text-rose-500 mr-3" />
                <span className="font-medium">
                  {productData.propertyType} của bạn
                </span>
              </div>
              <motion.button
                className="flex items-center text-sm font-medium bg-white px-3 py-1 rounded-full border border-gray-300 text-gray-700"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit("title")}
              >
                <MdEdit className="mr-1" />
                Chỉnh sửa
              </motion.button>
            </div>

            {/* Listing preview - Sửa lại phần này với grid 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Ảnh bìa */}
              <div className="md:col-span-1 relative h-64 md:h-full">
                {productData.images && productData.images[0] ? (
                  <div className="relative h-full">
                    <Image
                      src={productData.images[0]}
                      alt={productData.title}
                      fill
                      className="object-cover"
                      onLoad={() => setIsImageLoaded(true)}
                      onError={() => {
                        console.log("Error loading image");
                        setIsImageLoaded(true);
                      }}
                    />
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    {productData.isNew && (
                      <div className="absolute top-3 left-3 bg-gray-900 bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">
                        Mới
                      </div>
                    )}
                    <motion.button
                      className="absolute bottom-3 right-3 bg-white text-gray-800 px-2 py-1 rounded shadow-md text-xs"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit("photos")}
                    >
                      Chỉnh sửa ảnh
                    </motion.button>
                  </div>
                ) : (
                  // Fallback nếu không có ảnh
                  <div className="h-full bg-gray-200 flex flex-col items-center justify-center">
                    <MdOutlineCabin className="text-6xl text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Chưa có ảnh</span>
                    <button
                      className="mt-2 bg-gray-800 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEdit("photos")}
                    >
                      Thêm ảnh
                    </button>
                  </div>
                )}
              </div>

              {/* Thông tin */}
              <div className="md:col-span-2 p-5">
                <h2 className="font-medium text-xl mb-2">
                  {productData.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {productData.location.address}, {productData.location.city},{" "}
                  {productData.location.country}
                </p>
                <div className="text-sm text-gray-600 mb-3">
                  {productData.bedrooms} phòng ngủ · {productData.beds} giường ·{" "}
                  {productData.bathrooms} phòng tắm
                </div>

                <div className="flex flex-col mb-4">
                  <div className="flex items-baseline">
                    <span className="font-bold text-lg">
                      ₫
                      {formatCurrency(
                        productData.discountedPrice || productData.price
                      )}
                    </span>
                    <span className="text-gray-500 ml-1">/đêm</span>
                    {productData.discountedPrice < productData.price &&
                      productData.discountedPrice > 0 && (
                        <span className="text-gray-500 text-sm ml-2 line-through">
                          ₫{formatCurrency(productData.price)}
                        </span>
                      )}
                    <motion.button
                      className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit("price")}
                    >
                      Chỉnh sửa giá
                    </motion.button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-1">
                    Tiện nghi ({productData.amenities.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productData.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {productData.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{productData.amenities.length - 3} tiện nghi khác
                      </span>
                    )}
                    <motion.button
                      className="text-xs text-rose-500"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit("amenities")}
                    >
                      Chỉnh sửa
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  className="flex items-center px-4 py-2 bg-white border border-black text-black rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MdPreview className="mr-2" />
                  Hiển thị bản xem trước
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* What's next section */}
          <motion.div variants={itemVariant} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Tiếp theo là gì?</h2>

            <div className="space-y-5">
              <div className="flex border-l-4 border-rose-500 pl-4">
                <div className="bg-rose-100 p-2 rounded-full h-min mr-3">
                  <FaCheck className="text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium">
                    Xác nhận một vài thông tin rồi đăng cho thuê
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Chúng tôi sẽ báo cho bạn biết nếu bạn cần xác minh danh tính
                    hoặc đăng ký với chính quyền địa phương.
                  </p>
                </div>
              </div>

              <div className="flex border-l-4 border-gray-200 pl-4">
                <div className="bg-gray-100 p-2 rounded-full h-min mr-3">
                  <FaCalendarAlt className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Thiết lập lịch</h3>
                  <p className="text-gray-600 text-sm">
                    Chọn ngày mục cho thuê có thể đón khách. Mục cho thuê sẽ
                    hiển thị sau 24 giờ kể từ khi bạn đăng.
                  </p>
                </div>
              </div>

              <div className="flex border-l-4 border-gray-200 pl-4">
                <div className="bg-gray-100 p-2 rounded-full h-min mr-3">
                  <IoMdSettings className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Điều chỉnh cài đặt của bạn</h3>
                  <p className="text-gray-600 text-sm">
                    Đặt ra nội quy nhà, chọn chính sách hủy, chọn cách thức đặt
                    phòng của khách, v.v.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Check list */}
          <motion.div
            variants={itemVariant}
            className="mb-12 bg-gray-50 p-5 rounded-lg border border-gray-200"
          >
            <h3 className="flex items-center font-medium mb-3">
              <FaClipboardList className="text-rose-500 mr-2" />
              Danh sách kiểm tra trước khi đăng ({completedTasks}/4)
            </h3>

            <div className="space-y-2">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 rounded-full ${
                    productData.images && productData.images.length >= 5
                      ? "bg-green-500"
                      : "bg-gray-300"
                  } text-white flex items-center justify-center`}
                >
                  {productData.images && productData.images.length >= 5 ? (
                    <FaCheck className="text-xs" />
                  ) : null}
                </div>
                <span className="flex justify-between w-full">
                  <span>Đã thêm ít nhất 5 ảnh</span>
                  {!(productData.images && productData.images.length >= 5) && (
                    <button
                      onClick={() => handleEdit("photos")}
                      className="text-rose-500 text-sm"
                    >
                      Thêm ảnh
                    </button>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 rounded-full ${
                    productData.price > 0 ? "bg-green-500" : "bg-gray-300"
                  } text-white flex items-center justify-center`}
                >
                  {productData.price > 0 ? (
                    <FaCheck className="text-xs" />
                  ) : null}
                </div>
                <span className="flex justify-between w-full">
                  <span>Đã thiết lập giá</span>
                  {!productData.price && (
                    <button
                      onClick={() => handleEdit("price")}
                      className="text-rose-500 text-sm"
                    >
                      Thiết lập giá
                    </button>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 rounded-full ${
                    productData.title && productData.title.trim() !== ""
                      ? "bg-green-500"
                      : "bg-gray-300"
                  } text-white flex items-center justify-center`}
                >
                  {productData.title && productData.title.trim() !== "" ? (
                    <FaCheck className="text-xs" />
                  ) : null}
                </div>
                <span className="flex justify-between w-full">
                  <span>Đã mô tả chỗ ở</span>
                  {!(productData.title && productData.title.trim() !== "") && (
                    <button
                      onClick={() => handleEdit("title")}
                      className="text-rose-500 text-sm"
                    >
                      Thêm mô tả
                    </button>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 rounded-full ${
                    productData.amenities && productData.amenities.length > 0
                      ? "bg-green-500"
                      : "bg-gray-300"
                  } text-white flex items-center justify-center`}
                >
                  {productData.amenities && productData.amenities.length > 0 ? (
                    <FaCheck className="text-xs" />
                  ) : null}
                </div>
                <span className="flex justify-between w-full">
                  <span>Đã chọn các tiện nghi</span>
                  {!(
                    productData.amenities && productData.amenities.length > 0
                  ) && (
                    <button
                      onClick={() => handleEdit("amenities")}
                      className="text-rose-500 text-sm"
                    >
                      Chọn tiện nghi
                    </button>
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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
            completedTasks < 4 ? "opacity-70" : ""
          }`}
          whileHover={{
            scale: completedTasks === 4 ? 1.05 : 1,
            backgroundColor: completedTasks === 4 ? "#e11d48" : undefined,
          }}
          whileTap={{ scale: completedTasks === 4 ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={completedTasks < 4}
        >
          {completedTasks === 4 ? "Xuất bản" : "Hoàn thành các mục còn thiếu"}
        </motion.button>
      </motion.div>
    </div>
  );
}
