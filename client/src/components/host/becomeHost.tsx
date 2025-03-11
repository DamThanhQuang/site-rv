"use client";
import { useRouter } from "next/navigation";
export default function BecomeAHost() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/create/about-your-place");
  };
  return (
    <main className="flex flex-col max-w-6xl mx-auto px-4 py-12">
      <div className="w-full pr-0">
        <div className="flex space-y-8">
          <div className="flex flex-col justify-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Bắt đầu trên Airbnb thật dễ dàng
            </h1>
          </div>

          <div className="space-y-12">
            {/* Bước 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
                </h2>
                <p className="text-gray-600">
                  Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho
                  thuê và số lượng khách có thể ở tại đó.
                </p>
              </div>
              <div className="w-full md:w-48 lg:w-64 mt-4 md:mt-0">
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                  alt="Bước 1: Chia sẻ thông tin"
                />
              </div>
            </div>

            {/* Bước 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Làm cho nhà/phòng cho thuê trở nên nổi bật
                </h2>
                <p className="text-gray-600">
                  Thêm từ 5 ảnh trở lên cùng với tiêu đề và nội dung mô tả –
                  chúng tôi sẽ giúp bạn thực hiện.
                </p>
              </div>
              <div className="w-full md:w-48 lg:w-64 mt-4 md:mt-0">
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                  alt="Bước 2: Làm cho nhà/phòng nổi bật"
                />
              </div>
            </div>

            {/* Bước 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white font-semibold">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Hoàn thiện và đăng mục cho thuê
                </h2>
                <p className="text-gray-600">
                  Chọn giá khởi điểm, xác minh một vài thông tin, sau đó đăng
                  mục cho thuê của bạn.
                </p>
              </div>
              <div className="w-full md:w-48 lg:w-64 mt-4 md:mt-0">
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                  alt="Bước 3: Hoàn thiện và đăng"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel được di chuyển xuống dưới */}
      <div className="mt-12 max-w-md mx-auto w-full md:max-w-lg bg-gray-50 rounded-xl p-6 shadow-sm">
        <div className="text-center">
          <button
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            onClick={handleGetStarted}
          >
            Bắt đầu ngay
          </button>
        </div>
      </div>
    </main>
  );
}
