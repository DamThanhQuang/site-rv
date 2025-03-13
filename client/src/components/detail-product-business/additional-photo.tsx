import { motion } from "framer-motion";

export default function AdditionalPhoto() {
  return (
    <motion.div
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1 className="text-2xl font-bold mb-4">Chi tiết Ảnh Bổ Sung</h1>
      <p>Đây là giao diện trang mới hiển thị thông tin chi tiết.</p>
    </motion.div>
  );
}
