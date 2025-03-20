"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";

interface Listing {
  id: string;
  location: {
    city: string;
    country: string;
  };
  rating: number;
  type: string;
  date: string;
  price: string;
  images: string[];
  isLiked: boolean;
}

export default function Home() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<Record<string, boolean>>({});
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/product/get-all-product");

        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to fetch products");
        }

        const data = response.data;
        console.log("Fetched products:", data);
        console.log("Dữ liệu API nhận được:", data);
        console.log("Kiểu dữ liệu:", typeof data);

        const formattedData = data.map((item: any) => ({
          id: item._id,
          location: {
            city: item.location.city,
            country: item.location.country,
          },
          rating: item.rating,
          type: item.type,
          date: item.date,
          price: item.price,
          images: item.images.map((img: string) => img), // Chuyển đổi thành mảng URL
          isLiked: item.isLiked || false, // Đảm bảo có thuộc tính isLiked
        }));

        if (Array.isArray(data)) {
          console.log("Số lượng sản phẩm:", data.length);
          data.forEach((item, index) => {
            console.log(`Sản phẩm ${index}:`, item);
            console.log(`ID của sản phẩm ${index}:`, item.id);
          });
        }
        setListings(data);

        // Initialize favorites from API data
        const favoritesMap: Record<string, boolean> = {};
        data.forEach((item: Listing) => {
          favoritesMap[item.id] = item.isLiked;
        });
        setIsFavorite(favoritesMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cập nhật các hàm để xử lý id dạng string
  const toggleFavorite = (id: string) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextImage = (listingId: string, imagesLength: number) => {
    setImageIndices((prev) => {
      const currentIndex = prev[listingId] || 0;
      const nextIndex = (currentIndex + 1) % imagesLength;
      return {
        ...prev,
        [listingId]: nextIndex,
      };
    });
  };

  const handlePrevImage = (listingId: string, imagesLength: number) => {
    setImageIndices((prev) => {
      const currentIndex = prev[listingId] || 0;
      const prevIndex = (currentIndex - 1 + imagesLength) % imagesLength;
      return {
        ...prev,
        [listingId]: prevIndex,
      };
    });
  };

  const navigateToDetail = (id: string) => {
    if (!id) {
      console.error("Không thể chuyển trang: ID sản phẩm không xác định");
      return;
    }
    console.log("Đang chuyển đến sản phẩm:", id);
    router.push(`/product-detail/${id}`);
  };

  // Display loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-r-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Lỗi khi tải dữ liệu
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => {
            // Thêm log cho mỗi listing
            console.log(`Render sản phẩm:`, listing);
            console.log(`ID sản phẩm:`, listing.id);

            const currentIndex = imageIndices[listing.id] || 0;
            return (
              <motion.div
                key={listing.id}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigateToDetail(listing.id)}
              >
                {/* Carousel */}
                <div className="relative rounded-xl overflow-hidden aspect-square group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={listing.images[currentIndex]}
                        alt={`${listing.location.city}, ${listing.location.country}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="hover:opacity-95 transition object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Nút carousel prev */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(listing.id, listing.images.length);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {/* Nút carousel next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(listing.id, listing.images.length);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {/* Like button */}
                  <button
                    className="absolute top-3 right-3 p-1 z-10 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(listing.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFavorite[listing.id] ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-7 h-7 ${
                        isFavorite[listing.id] ? "text-red-500" : "text-white"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  {/* Liked badge */}
                  {listing.isLiked && (
                    <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-black text-xs font-medium py-1 px-2 rounded z-10">
                      Được khách yêu thích
                    </div>
                  )}
                  {/* Dots chỉ vị trí ảnh */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {listing.images.map((_, index) => (
                      <div
                        key={`${listing.id}-${index}`} // Sử dụng key kết hợp để đảm bảo tính duy nhất
                        className={`h-1.5 w-1.5 rounded-full ${
                          index === currentIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Thông tin listing */}
                <div className="mt-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-base">
                      {listing.location.city}, {listing.location.country}
                    </h3>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-1 text-sm">{listing.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{listing.type}</p>
                  <p className="text-gray-500 text-sm">{listing.date}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">{listing.price}</span>
                    <span className="text-gray-500"> / đêm</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
