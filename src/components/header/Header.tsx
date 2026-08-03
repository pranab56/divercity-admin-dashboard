"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Bell, ChevronRight, LogOut, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { removeToken } from "../../utils/storage";

export default function Header() {
  const userName = "Admin";
  const userRole = "DIVINE";
  const userInitial = "D";

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyProfile = () => {
    router.push("/settings");
    setIsDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(false);
    router.push("/notifications");
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutConfirmModal(true);
  };

  const handleConfirmLogout = () => {
    removeToken();
    document.cookie = "cat-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logged out successfully");
    setShowLogoutConfirmModal(false);
    router.push("/auth/login");
  };

  return (
    <>
      <header className="flex h-[72px] items-center justify-between px-4 sm:px-8 bg-[#EAEAEA] border-b border-gray-200/50 w-full shrink-0">
        {/* Left side - Sidebar Toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="p-2 text-gray-600 hover:bg-gray-200/70 rounded-lg cursor-pointer" />
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Home Page</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-700 font-semibold">Overview</span>
          </nav>
        </div>

        {/* Right side - Notification and Profile */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Notification Bell Pill */}
          <button
            type="button"
            onClick={handleNotificationClick}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border border-gray-200/80 shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-gray-600" />
          </button>

          {/* User Profile Pill with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleProfileClick}
              className="flex items-center gap-3 transition-colors cursor-pointer group"
            >
              {/* Name & Subtitle */}
              <div className="flex flex-col text-right hidden xs:flex">
                <span className="text-sm font-bold text-gray-900 leading-tight">{userName}</span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-tight mt-0.5">
                  {userRole}
                </span>
              </div>

              {/* Initial Avatar Badge in Primary Color #57154D */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#57154D] text-white font-bold text-sm sm:text-base flex items-center justify-center shadow-xs group-hover:bg-[#47103F] transition-colors">
                {userInitial}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={handleMyProfile}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span>My Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm font-semibold cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2 text-red-600 font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                <span>Confirm Logout</span>
              </div>
              <button
                type="button"
                onClick={() => setShowLogoutConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Are you sure you want to log out of DIIC Admin Dashboard?
            </p>

            <div className="pt-2 border-t border-gray-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-xs rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-[#57154D] hover:bg-[#430f3c] text-white font-medium text-xs rounded-lg shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Yes, Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}