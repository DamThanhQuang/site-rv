"use client";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUser,
  FaCamera,
  FaPen,
} from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import EditProfileModal from "./edit-profile";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { decode } from "punycode";

interface UserProfile {
  id: string;
  name: string;
  joinDate: string;
  location: string;
  contributions: number;
  likes: number;
  cities: number;
  photos: number;
  description?: string;
  avatar?: string;
  coverImage?: string;
}

// Add this utility function at the top of your file, after imports
const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ProfileUser = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Update fetchProfile to include better error handling
  const fetchProfile = async (id: string) => {
    try {
      setLoading(true);
      console.log("Fetching profile for userId:", id); // Debug log

      const response = await axios.get(
        `http://localhost:8000/api/v1/user/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile data received:", response.data); // Debug log
      setProfile(response.data);
    } catch (err) {
      console.error("Error details:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.push("/login");
        } else {
          setError(
            `Failed to load profile: ${
              err.response?.data?.message || "Unknown error"
            }`
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfile: Partial<UserProfile>) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/user/${profile?.id}`,
        updatedProfile
      );
      setProfile(response.data);
      setIsEditModalOpen(false);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  const handleAvatarUpdate = async (avatarUrl: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/user/${profile?.id}/avatar`,
        {
          avatarUrl,
        }
      );
      setProfile(response.data);
    } catch (err) {
      setError("Failed to update avatar");
      console.error(err);
    }
  };

  const handleCoverUpdate = async (coverImageUrl: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/user/${profile?.id}/cover-image`,
        {
          coverImageUrl,
        }
      );
      setProfile(response.data);
    } catch (err) {
      setError("Failed to update cover image");
      console.error(err);
    }
  };

  // Update the useEffect in your ProfileUser component
  useEffect(() => {
    // First try to get userId from cookie
    const userId = getCookie("userId");

    alert(userId);
    // If no userId in cookie, try to get it from token
    if (!userId) {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("token=")
      );

      if (tokenCookie) {
        const token = tokenCookie.split("=")[1];
        const decodedToken = decodeToken(token);

        if (decodedToken && decodedToken.sub) {
          // Use the userId from token
          fetchProfile(decodedToken.sub);
          return;
        }
      }

      // If no token or userId found, redirect to login
      console.log("No authentication found, redirecting to login");
      router.push("/login");
      return;
    }

    // If userId exists in cookie, use it
    console.log("Found userId in cookie:", userId);
    fetchProfile(userId.toString());
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Cover Image Section */}
        <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden">
          {profile.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <button
            onClick={() => handleCoverUpdate("new-cover-url")}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md font-semibold text-sm flex items-center gap-2 hover:bg-white transition-all"
          >
            <FaCamera className="w-4 h-4" />
            Change Cover
          </button>
        </div>

        {/* Profile Header - Update margin top */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-full h-full p-8 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => handleAvatarUpdate("new-avatar-url")}
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <FaCamera className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <p className="flex items-center gap-2">
                      <FaRegCalendarAlt className="w-4 h-4" />
                      {profile.joinDate}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      {profile.location}
                    </p>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
                    <FaPen className="w-4 h-4" />
                    Edit profile
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setIsEditModalOpen(true)}
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Edit Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Change Avatar
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Privacy Settings
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-red-100 text-red-900"
                                  : "text-red-700"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Delete Account
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600">
                    {profile.contributions}
                  </p>
                  <p className="text-gray-600">Contributions</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-rose-600">
                    {profile.likes}
                  </p>
                  <p className="text-gray-600">Helpful votes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">
                    {profile.cities}
                  </p>
                  <p className="text-gray-600">Cities visited</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">
                    {profile.photos}
                  </p>
                  <p className="text-gray-600">Photos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {profile.description && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-600">{profile.description}</p>
            </div>
          )}
        </div>

        {/* Navigation Tabs - Add these later */}
        <div className="border-b mb-8">
          <nav className="flex gap-8">
            <button className="px-4 py-2 border-b-2 border-indigo-600 font-medium text-indigo-600">
              Profile
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Reviews
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Photos
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Saves
            </button>
          </nav>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
    </>
  );
};

export default ProfileUser;
