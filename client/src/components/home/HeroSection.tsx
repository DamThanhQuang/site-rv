import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", { destination, checkIn, checkOut, guests });
    // Implement search functionality
  };

  return (
    <div className="relative w-full">
      {/* Hero image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/0123.jpg" // Add this image to your public folder
          alt="Beautiful vacation destination"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Khám phá điểm đến tuyệt vời
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Tìm và đặt những chỗ ở độc đáo trên khắp thế giới
          </p>

          {/* Search form */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-grow">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Điểm đến
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Thành phố, địa điểm du lịch"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>

              <div className="flex-grow md:flex-grow-0 md:w-36">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Nhận phòng
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>

              <div className="flex-grow md:flex-grow-0 md:w-36">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Trả phòng
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>

              <div className="flex-grow md:flex-grow-0 md:w-28">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Khách
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} khách
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
