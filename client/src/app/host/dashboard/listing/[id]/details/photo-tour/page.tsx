"use client";
import PhotoTour from "@/components/detail-product-business/photo-tour";
import { useRouter } from "next/navigation";

const PhotoTourPage = () => {
  const router = useRouter();
  return <PhotoTour onNavigate={(url) => router.push(url)} />;
};

export default PhotoTourPage;
