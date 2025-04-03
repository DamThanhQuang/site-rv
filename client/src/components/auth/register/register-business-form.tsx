"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "lib/utils";
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAmericas,
  FaInfoCircle,
  FaCheckCircle,
  FaRegCommentDots,
  FaIdCard,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

// Input Field Component with better UX
const InputField = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  required = true,
  errorMessage = "",
  icon: Icon,
  helperText = "",
  isValid = true,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  errorMessage?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  helperText?: string;
  isValid?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
      >
        {Icon && <Icon className="text-indigo-600" size={16} />}
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-2.5 rounded-lg border transition-all duration-200
            focus:ring-2 focus:ring-offset-0 focus:outline-none
            ${
              isFocused
                ? "border-indigo-600 ring-indigo-100"
                : "border-gray-300 hover:border-gray-400"
            }
            ${
              !isValid && value
                ? "border-rose-500 bg-rose-50 focus:ring-rose-100"
                : ""
            }
          `}
        />

        {!isValid && value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500"
          >
            <FaInfoCircle />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {(helperText || (errorMessage && !isValid && value)) && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs ${
              !isValid && errorMessage ? "text-rose-500" : "text-gray-500"
            } mt-1`}
          >
            {!isValid && errorMessage && value ? errorMessage : helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Textarea Component
const TextareaField = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  required = true,
  rows = 4,
  errorMessage = "",
  icon: Icon,
  helperText = "",
  isValid = true,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  errorMessage?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  helperText?: string;
  isValid?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
      >
        {Icon && <Icon className="text-indigo-600" size={16} />}
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative">
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-2.5 rounded-lg border transition-all duration-200
            focus:ring-2 focus:ring-offset-0 focus:outline-none
            ${
              isFocused
                ? "border-indigo-600 ring-indigo-100"
                : "border-gray-300 hover:border-gray-400"
            }
            ${
              !isValid && value
                ? "border-rose-500 bg-rose-50 focus:ring-rose-100"
                : ""
            }
          `}
        />
      </div>

      <AnimatePresence>
        {(helperText || (errorMessage && !isValid && value)) && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs ${
              !isValid && errorMessage ? "text-rose-500" : "text-gray-500"
            } mt-1`}
          >
            {!isValid && errorMessage && value ? errorMessage : helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export function RegisterBusiness({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Form validation
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phone ? phoneRegex.test(phone) : true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email ? emailRegex.test(email) : true;
  };

  const validateName = (name: string) => {
    return name ? name.length >= 3 : true;
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        name &&
        validateName(name) &&
        description &&
        owner &&
        validateEmail(owner)
      );
    } else {
      return (
        phoneNumber && validatePhone(phoneNumber) && address && city && country
      );
    }
  };

  // Handle form submission
  const registerBusiness = async (event: React.FormEvent) => {
    event.preventDefault();

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId) {
      setError("Không tìm thấy ID người dùng. Vui lòng đăng nhập!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `user/${userId}/register-business`,
        {
          name,
          description,
          owner,
          phoneNumber,
          address,
          city,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Đăng ký business thành công:", response.data);
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/host");
      }, 2000);
    } catch (error: any) {
      console.error("Đăng ký business thất bại:", error);

      // Handle API error messages
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Total number of steps in form
  const totalSteps = 2;

  // If the form was submitted successfully
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-16 px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đăng ký thành công!
          </h2>
          <p className="text-gray-600 mb-6">
            Thông tin kinh doanh của bạn đã được đăng ký thành công. Bạn sẽ được
            chuyển hướng đến trang chủ nhà...
          </p>
          <div className="w-8 h-8 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin mx-auto"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-10 px-4",
        className
      )}
      {...props}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Đăng ký kinh doanh
          </h1>
          <p className="text-gray-600 mt-2">
            Cung cấp thông tin kinh doanh của bạn để bắt đầu hành trình làm chủ
            nhà
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-medium
                      ${
                        currentStep > index + 1
                          ? "bg-indigo-600 text-white"
                          : ""
                      }
                      ${
                        currentStep === index + 1
                          ? "bg-indigo-600 text-white"
                          : ""
                      }
                      ${
                        currentStep < index + 1
                          ? "bg-gray-200 text-gray-600"
                          : ""
                      }
                    `}
                  >
                    {currentStep > index + 1 ? <FaCheckCircle /> : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className="flex-1 h-1 mx-4">
                      <div
                        className="h-full bg-gray-200"
                        style={{
                          background:
                            currentStep > index + 1
                              ? "linear-gradient(to right, #4f46e5, #4338ca)"
                              : "",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Thông tin cơ bản</span>
              <span className="text-sm text-gray-600">Thông tin liên hệ</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="md:grid md:grid-cols-5">
            {/* Left Column - Illustration (hidden on mobile) */}
            <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 relative">
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill="white"
                    fillRule="evenodd"
                  />
                  <path
                    d="M0,0 L100,0 L50,100 L0,100 Z"
                    fill="white"
                    fillRule="evenodd"
                    opacity="0.3"
                  />
                  <path
                    d="M0,0 L50,100 L0,100 Z"
                    fill="white"
                    fillRule="evenodd"
                    opacity="0.3"
                  />
                </svg>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-white text-2xl font-semibold mb-4">
                    {currentStep === 1
                      ? "Khởi đầu hành trình kinh doanh"
                      : "Hoàn thiện thông tin"}
                  </h2>
                  <p className="text-indigo-100 mb-6">
                    {currentStep === 1
                      ? "Chỉ cần vài phút để thiết lập thông tin kinh doanh và bắt đầu đón khách."
                      : "Thông tin liên hệ chính xác sẽ giúp khách hàng dễ dàng kết nối với bạn."}
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <h3 className="text-white font-medium mb-2">
                      Lợi ích khi đăng ký:
                    </h3>
                    <ul className="space-y-2 text-indigo-100">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-indigo-500/30 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </div>
                        <span>Tiếp cận hàng ngàn khách du lịch</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-indigo-500/30 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </div>
                        <span>Công cụ quản lý đặt phòng chuyên nghiệp</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-indigo-500/30 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </div>
                        <span>Hỗ trợ 24/7 từ đội ngũ chuyên viên</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white text-sm italic">
                      "Tôi đã tăng lợi nhuận hơn 30% kể từ khi đăng ký làm chủ
                      nhà trên nền tảng này."
                    </p>
                    <div className="flex items-center mt-3">
                      <div className="w-8 h-8 bg-indigo-500/30 rounded-full"></div>
                      <div className="ml-2">
                        <p className="text-white text-xs font-medium">
                          Nguyễn Văn A
                        </p>
                        <p className="text-indigo-200 text-xs">
                          Chủ nhà từ 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="md:col-span-3 p-8">
              <form onSubmit={registerBusiness}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Thông tin cơ bản
                      </h3>

                      <InputField
                        id="name"
                        label="Tên kinh doanh"
                        placeholder="Nhập tên công ty hoặc thương hiệu của bạn"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                        icon={FaBuilding}
                        isValid={validateName(name)}
                        errorMessage="Tên kinh doanh phải có ít nhất 3 kí tự"
                        helperText="Tên này sẽ hiển thị với khách hàng khi họ đặt phòng"
                      />

                      <TextareaField
                        id="description"
                        label="Mô tả kinh doanh"
                        placeholder="Mô tả ngắn gọn về dịch vụ của bạn"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setDescription(e.target.value)
                        }
                        icon={FaRegCommentDots}
                        helperText="Giới thiệu ngắn gọn về dịch vụ của bạn để khách hàng hiểu rõ hơn"
                      />

                      <InputField
                        id="owner"
                        label="Email liên hệ chính"
                        type="email"
                        placeholder="email@example.com"
                        value={owner}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setOwner(e.target.value)
                        }
                        icon={FaIdCard}
                        isValid={validateEmail(owner)}
                        errorMessage="Vui lòng nhập email hợp lệ"
                        helperText="Email này sẽ được dùng cho các thông báo quan trọng"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Thông tin liên hệ
                      </h3>

                      <InputField
                        id="phone"
                        label="Số điện thoại"
                        placeholder="+84 123 456 789"
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPhoneNumber(e.target.value)
                        }
                        icon={FaPhone}
                        isValid={validatePhone(phoneNumber)}
                        errorMessage="Vui lòng nhập số điện thoại hợp lệ"
                        helperText="Số điện thoại để liên hệ trực tiếp với bạn"
                      />

                      <InputField
                        id="address"
                        label="Địa chỉ"
                        placeholder="Số nhà, tên đường, phường/xã"
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAddress(e.target.value)
                        }
                        icon={FaMapMarkerAlt}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          id="city"
                          label="Thành phố"
                          placeholder="Thành phố"
                          value={city}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCity(e.target.value)
                          }
                          icon={FaCity}
                        />

                        <InputField
                          id="country"
                          label="Quốc gia"
                          placeholder="Quốc gia"
                          value={country}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCountry(e.target.value)
                          }
                          icon={FaGlobeAmericas}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mt-6"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-rose-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaChevronLeft size={12} />
                      <span>Quay lại</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    type="submit"
                    disabled={!isFormValid() || isLoading}
                    className={`
                      px-6 py-2.5 rounded-lg font-medium flex items-center gap-1
                      ${
                        isFormValid() && !isLoading
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                      transition-colors
                    `}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : currentStep < totalSteps ? (
                      <>
                        <span>Tiếp tục</span>
                        <FaChevronRight size={12} />
                      </>
                    ) : (
                      "Đăng ký"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Đã có tài khoản kinh doanh?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-800">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
