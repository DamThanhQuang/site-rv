import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyCardProps {
  listing: {
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
  };
  onNavigateToDetail: (id: string) => void;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

export default function PropertyCard({
  listing,
  onNavigateToDetail,
  isFavorite,
  toggleFavorite,
}: PropertyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + listing.images.length) % listing.images.length
    );
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onNavigateToDetail(listing.id)}
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

        {/* Prev button */}
        <button
          onClick={handlePrevImage}
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

        {/* Next button */}
        <button
          onClick={handleNextImage}
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
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-7 h-7 ${isFavorite ? "text-red-500" : "text-white"}`}
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

        {/* Image indicator dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {listing.images.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={`h-1.5 w-1.5 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Property info */}
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
}
