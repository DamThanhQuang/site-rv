"use client";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUser,
  FaCamera,
  FaPen,
  FaCog,
} from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import EditProfileModal from "./edit-profile";
import axios from "@/lib/axios";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  joinDate?: string;
  location: string;
  contributions?: number;
  likes?: number;
  cities?: number;
  photos?: number;
  description?: string;
  avatar?: string;
  coverImage?: string;
}

const ProfileUser = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = async (id: string) => {
    try {
      setLoading(true);
      console.log("Fetching profile for userId:", id);

      const token = Cookies.get("token");
      console.log("Token:", token);

      // Update the API endpoint to include the user ID
      const response = await axios.get(`user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile data received:", response.data);

      // Transform the backend data to match our UserProfile interface
      const userData = response.data;
      setProfile({
        id: userData._id || userData.id,
        name: userData.name || `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        joinDate: new Date(userData.createdAt).toLocaleDateString(),
        location: userData.location || "No location set",
        contributions: userData.contributions || 0,
        likes: userData.likes || 0,
        cities: userData.cities || 0,
        photos: userData.photos || 0,
        description: userData.description || "",
        avatar: userData.avatar || "",
        coverImage: userData.coverImage || "",
      });
    } catch (err) {
      console.error("Error details:", err);
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          Cookies.remove("userId");
          Cookies.remove("token");
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
      const token = Cookies.get("token");
      console.log("Update with token:", token); // Debug log

      if (!profile?.id) {
        console.log("No profile ID found");
        return;
      }

      //Chuan bi du lieu de update
      const updateData = {
        name: updatedProfile.name,
        location: updatedProfile.location,
        description: updatedProfile.description,
        email: updatedProfile.email,
      };

      console.log("data update:", updateData);

      const response = await axios.put(`user/${profile?.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      //update user voi data moi
      setProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ...response.data,
          id: prev.id, // Đảm bảo giữ nguyên ID
        };
      });

      console.log("Profile updated:", response.data);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Update error details:", err);
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          Cookies.remove("userId");
          Cookies.remove("token");
          router.push("/login");
        } else {
          setError(
            `Failed to update profile: ${
              err.response?.data?.message || "Unknown error"
            }`
          );
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleAvatarUpdate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const token = Cookies.get("token");
      if (!profile?.id || !token) {
        console.error("Missing profile ID or token");
        return;
      }

      // Tạo form data
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading avatar...");

      const response = await axios.put(`user/${profile.id}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Avatar update response:", response.data);

      setProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          avatar: response.data.avatar,
        };
      });
    } catch (err) {
      console.error("Avatar update error:", err);
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          Cookies.remove("userId");
          Cookies.remove("token");
          router.push("/login");
        } else {
          setError(
            `Failed to update avatar: ${
              err.response?.data?.message || "Unknown error"
            }`
          );
        }
      }
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
  const checkAuth = async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");

      console.log("Checking auth - userId:", userId, "token:", token);

      if (!userId || !token) {
        console.log("No auth credentials found");
        router.push("/login");
        return;
      }

      await fetchProfile(userId);
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/login");
    }
  };
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      checkAuth();
      fetchProfile(userId);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image Section - More responsive height */}
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] mb-8 rounded-xl overflow-hidden">
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
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-white transition-all"
          >
            <FaCamera className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Change Cover</span>
          </button>
        </div>

        {/* Profile Header - Improved responsive layout */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
            {/* Avatar Section - Responsive sizes */}
            <div className="relative">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarUpdate}
                className="hidden"
              />
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-full h-full p-6 sm:p-8 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-50 cursor-pointer"
              >
                <FaCamera className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </label>
            </div>

            {/* Profile Info - Better mobile layout */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                    {profile.name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 text-gray-600 mb-4">
                    <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <FaRegCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                      {profile.joinDate}
                    </p>
                    <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                      {profile.location}
                    </p>
                  </div>
                </div>

                {/* Edit Profile Menu - Responsive positioning */}
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="bg-white border border-gray-300 rounded-md px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 hover:bg-gray-50 text-sm">
                    <FaPen className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Edit profile</span>
                    <ChevronDownIcon
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
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
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setIsEditModalOpen(true)}
                              className={`${
                                active
                                  ? "bg-indigo-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <FaPen
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              Edit Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                /* handle settings */
                              }}
                              className={`${
                                active
                                  ? "bg-indigo-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <FaCog
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Stats Grid - Responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg sm:text-2xl font-bold text-indigo-600">
                    {profile.contributions}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Contributions
                  </p>
                </div>
                {/* ... repeat for other stat boxes ... */}
              </div>
            </div>
          </div>

          {/* Bio Section - Responsive padding */}
          {profile.description && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
              <p className="text-sm sm:text-base text-gray-600">
                {profile.description}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Tabs - Scrollable on mobile */}
        <div className="border-b mb-6 sm:mb-8 overflow-x-auto">
          <nav className="flex gap-4 sm:gap-8 min-w-max">
            <button className="px-3 py-2 sm:px-4 sm:py-2 border-b-2 border-indigo-600 font-medium text-sm sm:text-base text-indigo-600">
              Profile
            </button>
            {/* ... other nav buttons ... */}
          </nav>
        </div>
      </div>

      {/* Edit Profile Modal */}
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
