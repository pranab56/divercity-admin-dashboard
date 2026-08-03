"use client";

import React, { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function SecuritySettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (newPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    toast.success("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <div className="lg:col-span-9 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleUpdatePassword} className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            Protect your account and platform data
          </p>
        </div>

        {/* Change Password Section */}
        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, currentPassword: "" }));
                }}
                className={`w-full pl-4 pr-10 py-3.5 bg-white border rounded-md text-xs font-medium text-gray-900 focus:outline-none transition-colors ${errors.currentPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-400/40 bg-red-50/30"
                    : "border-gray-300/80 focus:ring-2 focus:ring-[#8E25E3]/40"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.currentPassword}</span>
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                className={`w-full pl-4 pr-10 py-3.5 bg-white border rounded-md text-xs font-medium text-gray-900 focus:outline-none transition-colors ${errors.newPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-400/40 bg-red-50/30"
                    : "border-gray-300/80 focus:ring-2 focus:ring-[#8E25E3]/40"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.newPassword}</span>
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              className={`w-full px-4 py-3.5 bg-white border rounded-md text-xs font-medium text-gray-900 focus:outline-none transition-colors ${errors.confirmPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-400/40 bg-red-50/30"
                  : "border-gray-300/80 focus:ring-2 focus:ring-[#8E25E3]/40"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[11px] mt-1.5 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
