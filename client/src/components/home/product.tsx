"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isFavorite, setIsFavorite] = useState<Record<number, boolean>>({});
  // Lưu trữ index ảnh hiện tại của từng listing theo id
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});

  const toggleFavorite = (id: number) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Hàm chuyển sang ảnh kế tiếp, nếu vượt quá độ dài mảng thì quay về 0
  const handleNextImage = (listingId: number, imagesLength: number) => {
    setImageIndices((prev) => {
      const currentIndex = prev[listingId] || 0;
      const nextIndex = (currentIndex + 1) % imagesLength;
      return {
        ...prev,
        [listingId]: nextIndex,
      };
    });
  };

  // Hàm chuyển sang ảnh trước, nếu dưới 0 thì quay lại ảnh cuối cùng
  const handlePrevImage = (listingId: number, imagesLength: number) => {
    setImageIndices((prev) => {
      const currentIndex = prev[listingId] || 0;
      const prevIndex = (currentIndex - 1 + imagesLength) % imagesLength;
      return {
        ...prev,
        [listingId]: prevIndex,
      };
    });
  };

  const listings = [
    {
      id: 1,
      location: "Na Chom Thian, Thái Lan",
      rating: 4.82,
      type: "Bãi biển Jomtien",
      date: "19 - 24 tháng 3",
      price: "₫2.160.361",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: true,
    },
    {
      id: 2,
      location: "Thành phố Hạ Long, Việt Nam",
      rating: 4.97,
      type: "Cách 131 km",
      date: "10 - 15 tháng 4",
      price: "₫829.045",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: false,
    },
    {
      id: 33,
      location: "Thành phố Hạ Long, Việt Nam",
      rating: 4.97,
      type: "Cách 131 km",
      date: "10 - 15 tháng 4",
      price: "₫829.045",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: false,
    },
    {
      id: 4,
      location: "Thành phố Hạ Long, Việt Nam",
      rating: 4.97,
      type: "Cách 131 km",
      date: "10 - 15 tháng 4",
      price: "₫829.045",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: false,
    },
    {
      id: 5,
      location: "Thành phố Hạ Long, Việt Nam",
      rating: 4.97,
      type: "Cách 131 km",
      date: "10 - 15 tháng 4",
      price: "₫829.045",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: false,
    },
    {
      id: 6,
      location: "Thành phố Hạ Long, Việt Nam",
      rating: 4.97,
      type: "Cách 131 km",
      date: "10 - 15 tháng 4",
      price: "₫829.045",
      images: [
        "https://a0.muscache.com/im/ml/photo_enhancement/pictures/a31ffa2d-a252-4e5e-ad37-207a78c98393.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/106fa744-3428-4630-85f9-750c1693d906.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-624118095084414409/original/dd43da64-5a56-4bc6-b82b-04f7cab91d9a.jpeg?im_w=720",
      ],
      isLiked: false,
    },
  ];

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => {
            const currentIndex = imageIndices[listing.id] || 0;
            return (
              <div key={listing.id} className="relative">
                {/* Carousel */}
                <div className="relative rounded-xl overflow-hidden aspect-square group">
                  <div className="w-full h-full">
                    <Image
                      src={listing.images[currentIndex]}
                      alt={listing.location}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="hover:opacity-95 transition object-cover"
                    />
                  </div>
                  {/* Nút carousel prev */}
                  <button
                    onClick={() =>
                      handlePrevImage(listing.id, listing.images.length)
                    }
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
                    onClick={() =>
                      handleNextImage(listing.id, listing.images.length)
                    }
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
                    onClick={() => toggleFavorite(listing.id)}
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
                        key={index}
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
                      {listing.location}
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
