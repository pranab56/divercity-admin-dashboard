"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Errors state
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    setPasswordError("");
    setConfirmPasswordError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    toast.success("Password changed successfully!");
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#EBEBEB] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center space-y-6 my-auto py-8">
        {!isSuccess ? (
          /* --- FORM VIEW (Image 4) --- */
          <>
            {/* Centered DIIC Logo */}
            <div className="flex justify-center mb-2">
              <img
                src="/logo/logo.png"
                alt="DIIC Logo"
                className="h-28 sm:h-32 object-contain"
              />
            </div>

            {/* Header Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Set New Password
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Create a new password for your account.
              </p>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left pt-2">
              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 bg-[#E0E0E3] border ${passwordError ? "border-red-500" : "border-gray-300/60"
                    } rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all`}
                />
                {/* Requirement error message under input field */}
                {passwordError && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError("");
                  }}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 bg-[#E0E0E3] border ${confirmPasswordError ? "border-red-500" : "border-gray-300/60"
                    } rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all`}
                />
                {/* Requirement error message under input field */}
                {confirmPasswordError && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Confirm
              </button>

              {/* Back to Sign In Button */}
              <Link
                href="/auth/login"
                className="block w-full py-3.5 bg-[#E2E2E5] border border-gray-300 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs sm:text-sm text-center transition-all cursor-pointer shadow-2xs"
              >
                Back to Sign In
              </Link>
            </form>
          </>
        ) : (
          /* --- SUCCESS STATE VIEW (Image 5) --- */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 py-4">
            {/* Confetti & Checkmark Badge */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute w-44 h-44 pointer-events-none">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full absolute top-2 left-6 animate-bounce" />
                <span className="w-2 h-2 bg-emerald-500 rounded-sm absolute top-6 right-8 rotate-45" />
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute bottom-4 left-8" />
                <span className="w-2 h-2 bg-pink-500 rounded-sm absolute bottom-8 right-6 rotate-12" />
                <span className="w-3 h-1.5 bg-amber-400 rounded-xs absolute top-12 -left-2 rotate-45" />
                <span className="w-3 h-1.5 bg-purple-400 rounded-xs absolute bottom-12 -right-2 -rotate-45" />
              </div>

              <div className="w-20 h-20 bg-[#57154D] text-[#FFFFFF] rounded-full flex items-center justify-center shadow-xl relative z-10">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Password Changed!
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
                Your password has been updated successfully. You can now sign in securely.
              </p>
            </div>

            {/* Get Started Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="w-full py-3.5 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}