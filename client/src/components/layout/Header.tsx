"use client";

import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import axios from "axios";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    const userId = getCookie("userId");
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/${userId}`,
          { withCredentials: true }
        );
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Navbar fluid rounded className="shadow-sm bg-white fixed w-full">
      <Navbar.Brand href="/">
        <img
          src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Your Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.name || "User"}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email || "user@example.com"}
              </span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} href="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} href="/settings">
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item> */}
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button color="gray">Log in</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
