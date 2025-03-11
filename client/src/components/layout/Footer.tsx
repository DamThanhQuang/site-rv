export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Coang123. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-rose-500 text-sm">
              Về chúng tôi
            </a>
            <a href="#" className="text-gray-600 hover:text-rose-500 text-sm">
              Điều khoản
            </a>
            <a href="#" className="text-gray-600 hover:text-rose-500 text-sm">
              Chính sách
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
