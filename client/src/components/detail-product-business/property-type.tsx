"use client";
import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export default function PropertyType() {
  const [floors, setFloors] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [buildYear, setBuildYear] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Loại chỗ ở</h2>
        <form className="space-y-6">
          {/* Property Category */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Loại nào giống nhà/phòng cho thuê của bạn nhất?
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-xl py-4 px-4 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                <option>Căn hộ</option>
                <option>Nhà</option>
                <option>Căn hộ phụ</option>
                <option>Không gian độc đáo</option>
                <option>Chỗ nghỉ phục vụ bữa sáng</option>
                <option>Khách sạn boutique</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Loại chỗ ở
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-xl py-4 px-4 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                <option>Nhà</option>
                <option>Nhà phố</option>
                <option>Bungalow</option>
                <option>Cabin</option>
                <option>Nhà gỗ chalet</option>
                <option>Nhà bằng đất</option>
                <option>Lều</option>
                <option>Ngọn hải đăng</option>
                <option>Biệt thự</option>
                <option>Nhà mái vòm</option>
                <option>Nhà nghỉ thôn dã</option>
                <option>Nhà nghỉ nông trại</option>
                <option>Nhà thuyền</option>
                <option>Nhà siêu nhỏ</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Một ngôi nhà được làm bằng các vật liệu tự nhiên như gỗ và nằm
              giữa khung cảnh thiên nhiên.
            </p>
          </div>

          {/* Rental Type */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Loại hình cho thuê
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-xl py-4 px-4 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                <option>Toàn bộ nhà</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Khách sẽ dùng toàn bộ chỗ ở này cho riêng mình. Chỗ ở này thường
              có một phòng ngủ, một phòng tắm và bếp.
            </p>
          </div>

          {/* Number of Floors */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Tòa nhà đó có bao nhiêu tầng?
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFloors(Math.max(1, floors - 1))}
                className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-4 text-lg">{floors}</span>
              <button
                type="button"
                onClick={() => setFloors(floors + 1)}
                className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Floor */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Nhà/phòng cho thuê nằm ở tầng mấy?
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setCurrentFloor(Math.max(1, currentFloor - 1))}
                className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-4 text-lg">{currentFloor}</span>
              <button
                type="button"
                onClick={() =>
                  setCurrentFloor(Math.min(floors, currentFloor + 1))
                }
                className="border border-gray-300 rounded-full p-2 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Build Year */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Năm xây dựng
            </label>
            <input
              type="text"
              value={buildYear}
              onChange={(e) => setBuildYear(e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Năm xây dựng"
            />
          </div>

          {/* Property Scale */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Quy mô chỗ ở
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-xl py-4 px-4 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                <option>Đơn vị</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Diện tích không gian trong nhà mà khách được sử dụng.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white rounded-lg py-3 px-6 font-medium hover:bg-gray-800"
            >
              Lưu
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
