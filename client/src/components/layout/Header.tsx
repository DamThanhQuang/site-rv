"use client";

import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import { FaBars, FaTimes, FaBriefcase } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      console.log("Checking auth - userId:", userId, "token exists:", !!token);

      if (userId && token) {
        const response = await axios.get(`user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("User data received:", response.data);

        // Transform data to match User interface
        const userData = response.data;
        setUser({
          name: userData.name || `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          avatar:
            userData.avatar ||
            "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };
  const handleSignOut = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Navbar fluid className="shadow-sm bg-white fixed w-full z-50 px-4 py-2.5">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <Navbar.Brand href="/home" className="flex items-center">
          <img
            src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
            className="h-6 sm:h-8 mr-3"
            alt="Your Logo"
          />
        </Navbar.Brand>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/home"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* User Menu */}
        <div className="flex items-center md:order-2">
          {isLoggedIn && user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="relative">
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-gray-300"
                    src={
                      user?.avatar ||
                      "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    alt="User avatar"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
                    }}
                  />
                  <span className="bottom-0 left-5 sm:left-7 absolute w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} href="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                href="/host"
                className="flex items-center gap-2"
              >
                <FaBriefcase className="w-4 h-4" />
                <span>Quản lí căn hộ, phòng cho thuê</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button color="gray" size="sm" className="ml-2">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
