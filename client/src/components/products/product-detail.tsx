"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaShare, FaMapMarkerAlt } from "react-icons/fa";

interface Product {
  id: string | string[] | undefined;
  image: string[]; // Changed to array for multiple images
  title: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  amenities: string[];
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const mockProduct = {
      id: productId,
      image: [
        "https://a0.muscache.com/im/pictures/c238f6c3-e3d8-44c4-b529-9fabce2004d4.jpg?im_w=720&im_format=avif&im_origin=fuzzy",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMDQ0ODk%3D/original/db6ca2e7-c532-47e2-82a0-1515d9197d86.jpeg?im_w=720&im_format=avif&im_origin=fuzzy",
        "https://a0.muscache.com/im/pictures/05ca8f61-a9f7-4ab7-b960-69ffa95a830a.jpg?im_w=720&im_format=avif&im_origin=fuzzy",
        "https://a0.muscache.com/im/pictures/b30cf8d0-3be7-40e1-85a8-909040398aa8.jpg?im_w=720&im_format=avif&im_origin=fuzzy",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMDQ0ODk%3D/original/e0e5dc7d-7ac0-47bf-9f60-d27458c81b0a.jpeg?im_w=720&im_format=avif&im_origin=fuzzy",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg",
      ],
      title: "Luxury Villa with Ocean View",
      description:
        "Beautiful villa with stunning ocean views and modern amenities.",
      price: 299.99,
      location: "Bali, Indonesia",
      rating: 4.9,
      reviews: 128,
      host: {
        name: "John Doe",
        image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
        isSuperhost: true,
      },
      amenities: [
        "WiFi",
        "Pool",
        "Kitchen",
        "Air conditioning",
        "Beach access",
      ],
    };
    setProduct(mockProduct);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-16 md:pt-24 ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {product.title}
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
              <span className="mx-1">·</span>
              <span className="underline">{product.reviews} reviews</span>
            </div>
            <span className="hidden sm:block mx-1">·</span>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              <span>{product.location}</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md flex-1 sm:flex-initial justify-center">
              <FaShare />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md flex-1 sm:flex-initial justify-center">
              <FaHeart />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden relative group">
        <div className="md:col-span-2 md:row-span-2 transition duration-300 ease-in-out hover:opacity-90">
          <img
            src={product.image[selectedImage]}
            alt=""
            className="w-full h-64 md:h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(0)}
          />
        </div>
        {product.image.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className="hidden md:block transition duration-300 ease-in-out hover:opacity-90"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setSelectedImage(index + 1)}
            />
          </div>
        ))}

        {/* Show all photos button */}
        <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md font-semibold text-sm hidden group-hover:flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Show all photos
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between pb-6 border-b gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Hosted by {product.host.name}
              </h2>
              {product.host.isSuperhost && (
                <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-sm inline-block">
                  Superhost
                </span>
              )}
            </div>
            <img
              src={product.host.image}
              alt={product.host.name}
              className="w-14 h-14 rounded-full"
            />
          </div>

          <div className="py-6 border-b">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              About this place
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="py-6 border-b">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              What this place offers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    ✓
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="relative lg:static">
          <div className="sticky top-24 bg-white p-6 rounded-xl border shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl md:text-2xl font-semibold">
                ${product.price}
                <span className="text-base font-normal">night</span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <span className="ml-1">{product.rating}</span>
              </div>
            </div>
            <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition">
              Reserve
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold">
            ${product.price}
            <span className="text-sm font-normal">/night</span>
          </div>
        </div>
        <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition">
          Reserve
        </button>
      </div>
    </div>
  );
}
