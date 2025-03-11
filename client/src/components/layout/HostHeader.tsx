"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiCalendar,
  FiStar,
  FiMenu,
  FiX,
  FiGrid,
  FiHelpCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";

const navigation = [
  {
    name: "Hôm nay",
    href: "/host/dashboard/today",
    icon: FiGrid,
  },
  {
    name: "Lịch",
    href: "/host/dashboard/calendar",
    icon: FiCalendar,
  },
  {
    name: "Nhà/Phòng cho thuê",
    href: "/host/dashboard/listing",
    icon: IoHomeOutline,
  },
  {
    name: "Đánh giá",
    href: "/host/dashboard/reviews",
    icon: FiStar,
  },
  {
    name: "Tin nhắn",
    href: "/host/dashboard/messages",
    icon: FiMessageCircle,
  },
];

export default function HostHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-10 bg-white w-full">
      <div className="w-full px-4 py-3">
        <div className="flex justify-between items-center max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2">
          <Link
            href="/host"
            className="text-rose-500 font-bold text-2xl flex items-center gap-2"
          >
            <span>Coang123</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-rose-600 bg-rose-50"
                    : "text-gray-600 hover:text-rose-500 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            ))}

            {/* Help Button */}
            <button className="flex items-center text-gray-600 hover:text-rose-500">
              <FiHelpCircle className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-3">
            <div className="space-y-1 pt-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-600 hover:text-rose-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
