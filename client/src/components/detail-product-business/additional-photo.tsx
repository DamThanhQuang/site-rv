"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

interface AdditionalPhotoProps {
  onBack: () => void;
  listingId: string | null;
  productTitle: string; // Truyền title hiện tại của sản phẩm
}

const AdditionalPhoto = ({
  onBack,
  listingId,
  productTitle,
}: AdditionalPhotoProps) => {
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Tạo URL xem trước cho file đã chọn
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  // Khi người dùng chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  // Upload ảnh cùng với title lên API
  const handleUpload = async () => {
    if (!listingId) {
      toast.error("Missing listing ID");
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ảnh.");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      // Gửi title (đảm bảo không để trống và là chuỗi)
      formData.append("title", productTitle);
      // Gửi ảnh với key "images" (theo yêu cầu của API)
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.put(
        `/business/update-product/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Upload ảnh thành công");
      // Reset lại danh sách file sau khi upload
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      if (isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
        toast.error(
          `Upload failed: ${
            Array.isArray(error.response.data.message)
              ? error.response.data.message.join(", ")
              : error.response.data.message || "Please check file requirements"
          }`
        );
      } else {
        toast.error("Có lỗi khi upload ảnh");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600">
        <svg
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại
      </button>

      <h2 className="text-2xl font-semibold mb-6">
        Thêm ảnh cho phòng của bạn
      </h2>

      <div className="mb-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-gray-600">
            Kéo và thả ảnh vào đây hoặc bấm để tải lên
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Hỗ trợ JPG, PNG. Tối đa 10MB mỗi ảnh.
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
            onClick={() => fileInputRef.current?.click()}
          >
            Chọn ảnh
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {previews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Xem trước ảnh đã chọn:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={src}
                  alt={`Ảnh xem trước ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Đang cập nhật..." : "Cập nhật ảnh"}
      </motion.button>
    </div>
  );
};

export default AdditionalPhoto;
