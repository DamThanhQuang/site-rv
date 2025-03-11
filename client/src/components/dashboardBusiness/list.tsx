import HostHeader from "../layout/HostHeader";

export default function List() {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Nhà/Phòng cho thuê của bạn
          </h1>
        </header>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <img
              src="https://a0.muscache.com/pictures/87444596-1857-4437-9667-4f9cb4f5baf2.jpg"
              alt="home"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="text-center text-gray-600 mb-4">
            Bạn chưa có mục cho thuê nào
          </div>
          <div className="text-center text-gray-600 mb-6">
            Tạo mục cho thuê với Airbnb Setup để bắt đầu nhận yêu cầu đặt phòng.
          </div>
          <div>
            <a
              href="/host/become-host"
              className="inline-block px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition"
            >
              Bắt đầu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
