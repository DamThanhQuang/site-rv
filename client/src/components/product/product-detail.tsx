"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaShare, FaMapMarkerAlt } from "react-icons/fa";
import axios from "@/lib/axios";

interface Rating {
  stars: number;
  count: number;
  percentage: number;
}

interface Review {
  id: number;
  rating: number;
  title: string;
  comment: string;
  user: {
    name: string;
    image: string;
  };
  date: string;
}

interface Product {
  id: number;
  image: string[]; //
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  rating: number;
  reviews: Review[];
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  amenities: string[];
  ratings: Rating[];
  totalRatings: number;
  averageRating: number;
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAlternateHeader, setShowAlternateHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowAlternateHeader(true);
      } else {
        setShowAlternateHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/product/get-product/${productId}`);

        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to fetch product details");
        }
        console.log("Product details:", response.data);

        setProduct(response.data);
        setIsSuccess(true);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setIsError(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-rose-500 border-b-rose-500 border-r-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Lỗi khi tải dữ liệu
          </div>
          <p className="text-gray-600">{isError}</p>
          <button
            className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50 transition-transform duration-300 ${
          showAlternateHeader ? "-translate-y-full" : "translate-y-0"
        }`}
      ></header>

      {/* Alternate Header */}
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
          showAlternateHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium">
              ${product.price}{" "}
              <span className="text-sm font-normal">night</span>
            </h2>
            <div className="flex items-center">
              <FaStar className="text-yellow-400" />
              <span className="ml-1">{product.rating}</span>
            </div>
          </div>
          <button className="bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-700 transition">
            Reserve
          </button>
        </div>
      </header>

      {/* Existing Content */}
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
                <span className="underline">
                  {product.reviews.length} reviews
                </span>
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

        {/* Add Reviews Section */}
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="w-full">
              <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">
                Customer Reviews
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
                <div className="box flex flex-col gap-y-4 w-full">
                  {product.ratings.map((rating) => (
                    <div
                      key={rating.stars}
                      className="flex items-center w-full"
                    >
                      <p className="font-medium text-lg text-black mr-0.5">
                        {rating.stars}
                      </p>
                      <FaStar className="text-amber-400 w-5 h-5" />
                      <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                        <span
                          className="h-full rounded-3xl bg-amber-400 flex"
                          style={{ width: `${rating.percentage}%` }}
                        ></span>
                      </p>
                      <p className="font-medium text-lg text-black mr-0.5">
                        {rating.count >= 1000
                          ? `${(rating.count / 1000).toFixed(1)}K`
                          : rating.count}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
                  <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6">
                    {product.averageRating}
                  </h2>
                  <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className="text-amber-400 w-11 h-11"
                      />
                    ))}
                  </div>
                  <p className="font-medium text-xl leading-8 text-gray-900 text-center">
                    {product.totalRatings} Ratings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Reviews */}
        {product.reviews.map((review, index) => (
          <div
            key={review.id}
            className={`${
              index === 0 ? "pt-11" : "pt-8"
            } pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto`}
          >
            <div className="flex items-center gap-3 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400 w-7 h-7" />
              ))}
            </div>
            <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">
              {review.title}
            </h3>
            <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.user.image}
                  alt={`${review.user.name} image`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h6 className="font-semibold text-lg leading-8 text-indigo-600">
                  {review.user.name}
                </h6>
              </div>
              <p className="font-normal text-lg leading-8 text-gray-400">
                {review.date}
              </p>
            </div>
            <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
              {review.comment}
            </p>
          </div>
        ))}

        {/* Mobile Fixed Bottom Booking Card */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-50">
          <div className="container mx-auto max-w-lg">
            <div className="bg-white rounded-t-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    ${product.price}
                    <span className="text-sm font-normal text-gray-600">
                      /night
                    </span>
                  </p>
                  <div className="flex items-center text-sm">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                    <span className="mx-1">·</span>
                    <span className="underline">
                      {product.reviews.length} reviews
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition">
                    Reserve
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-2">
                  <p className="text-xs text-gray-500">Check-in</p>
                  <p className="text-sm font-medium">Add date</p>
                </div>
                <div className="border rounded-lg p-2">
                  <p className="text-xs text-gray-500">Check-out</p>
                  <p className="text-sm font-medium">Add date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
