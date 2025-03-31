interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-4">⚠️ Lỗi khi tải dữ liệu</div>
        <p className="text-gray-600">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onRetry}
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
