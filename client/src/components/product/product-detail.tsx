"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaHeart,
  FaShare,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import axios from "@/lib/axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
  const productId = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAlternateHeader, setShowAlternateHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [booking, setBooking] = useState({
    dateRange: {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: "selection",
    },
    guests: 1,
    isSubmitting: false,
    message: "",
    error: null as string | null,
    success: false,
  });

  // Calculate number of nights and total price
  const nightCount =
    booking.dateRange.endDate && booking.dateRange.startDate
      ? Math.ceil(
          (booking.dateRange.endDate.getTime() -
            booking.dateRange.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  const totalPrice = (product?.price || 0) * nightCount;

  // Handle opening the booking modal
  const handleReserveClick = () => {
    setShowBookingModal(true);
  };

  // Handle booking submission
  const handleBookNow = async () => {
    if (!product) return;

    try {
      setBooking((prev) => ({ ...prev, isSubmitting: true, error: null }));

      const bookingData = {
        productId: product.id,
        checkIn: booking.dateRange.startDate,
        checkOut: booking.dateRange.endDate,
        guests: booking.guests,
        totalPrice: totalPrice,
      };

      const response = await axios.post("/bookings/create", bookingData);

      setBooking((prev) => ({
        ...prev,
        isSubmitting: false,
        success: true,
        message:
          "Booking successful! We'll send confirmation details to your email.",
      }));

      // Close modal after 3 seconds of success
      setTimeout(() => {
        setShowBookingModal(false);
        setBooking((prev) => ({
          ...prev,
          success: false,
          message: "",
        }));
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      setBooking((prev) => ({
        ...prev,
        isSubmitting: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to complete booking. Please try again.",
      }));
    }
  };

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
        console.log("Fetching product with ID:", productId); // Debug log

        if (!productId) {
          throw new Error("Product ID is missing");
        }

        const response = await axios.get(`/product/get-product/${productId}`);
        console.log("API Response:", response);

        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to fetch product details");
        }

        const productData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        console.log("Product data:", productData);

        // Transform backend data to match your frontend Product interface
        const transformedProduct = {
          id: productData._id,
          image: productData.images || [productData.image || ""],
          title: productData.name || "Product Name",
          description: productData.description || "No description available",
          price: productData.price || 0,
          location: productData.location || {
            address: "N/A",
            city: "N/A",
            country: "N/A",
          },
          rating: productData.averageRating || 0,
          reviews:
            productData.reviews?.map((r: any, i: number) => ({
              id: i,
              rating: r.rating || 0,
              title: "Review",
              comment: r.comment || "",
              user: {
                name: r.userId || "Anonymous",
                image: "https://via.placeholder.com/150",
              },
              date: new Date(r.createdAt).toLocaleDateString(),
            })) || [],
          host: {
            name: "Host",
            image: "https://via.placeholder.com/150",
            isSuperhost: false,
          },
          amenities: productData.amenities || [
            "WiFi",
            "Parking",
            "Air Conditioning",
          ],
          ratings: [
            { stars: 5, count: 0, percentage: 0 },
            { stars: 4, count: 0, percentage: 0 },
            { stars: 3, count: 0, percentage: 0 },
            { stars: 2, count: 0, percentage: 0 },
            { stars: 1, count: 0, percentage: 0 },
          ],
          totalRatings: productData.reviews?.length || 0,
          averageRating: productData.averageRating || 0,
        };

        setProduct(transformedProduct);
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
    } else {
      setIsError("No product ID provided");
      setIsLoading(false);
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

  // Add this JSX for the booking modal
  const BookingModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showBookingModal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Complete your booking</h3>
            <button
              onClick={() => setShowBookingModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Your trip</h4>
            <DateRange
              editableDateInputs={true}
              onChange={(item) =>
                setBooking((prev) => ({
                  ...prev,
                  dateRange: {
                    startDate: item.selection.startDate || new Date(),
                    endDate:
                      item.selection.endDate ||
                      new Date(new Date().setDate(new Date().getDate() + 1)),
                    key: item.selection.key || "selection",
                  },
                }))
              }
              moveRangeOnFirstSelection={false}
              ranges={[booking.dateRange]}
              minDate={new Date()}
              className="w-full border rounded-lg"
            />
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2">Guests</h4>
            <div className="flex items-center border rounded-lg p-2">
              <FaUser className="text-gray-500 mr-2" />
              <select
                value={booking.guests}
                onChange={(e) =>
                  setBooking((prev) => ({
                    ...prev,
                    guests: parseInt(e.target.value),
                  }))
                }
                className="w-full p-2 outline-none"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} guest{i !== 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>
                ${product?.price || 0} × {nightCount} night
                {nightCount !== 1 ? "s" : ""}
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          {booking.error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {booking.error}
            </div>
          )}

          {booking.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {booking.message}
            </div>
          )}

          <button
            onClick={handleBookNow}
            disabled={booking.isSubmitting}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition disabled:bg-rose-300"
          >
            {booking.isSubmitting ? "Processing..." : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );

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
              ${product.price || 0}{" "}
              <span className="text-sm font-normal">night</span>
            </h2>
            <div className="flex items-center">
              <FaStar className="text-yellow-400" />
              <span className="ml-1">{product.rating}</span>
            </div>
          </div>
          <button
            className="bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-700 transition"
            onClick={handleReserveClick}
          >
            Đặt phòng
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
                <span>{`${product.location.address}, ${product.location.city}, ${product.location.country}`}</span>
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
                  ${product.price || 0}
                  <span className="text-base font-normal">night</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
              <button
                className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
                onClick={handleReserveClick}
              >
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
                    ${product.price || 0}
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
                  <button
                    className="bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition"
                    onClick={handleReserveClick}
                  >
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

      {/* Render the booking modal */}
      <BookingModal />
    </>
  );
}
