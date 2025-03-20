"use client";

import { motion } from "framer-motion";
import AdditionalPhoto from "@/components/detail-product-business/additional-photo";
import { useRouter, useParams } from "next/navigation";

export default function AdditionalPhotoPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params?.id ? String(params.id) : null;

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AdditionalPhoto
        onBack={handleBack}
        listingId={listingId}
        productTitle="Property Title"
      />
    </motion.div>
  );
}
