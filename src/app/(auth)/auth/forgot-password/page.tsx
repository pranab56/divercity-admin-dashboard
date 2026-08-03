"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email address is required");
      return;
    }

    toast.success("Reset link sent to your email!");
    router.push("/auth/verify-email");
  };

  return (
    <div className="min-h-screen w-full bg-[#EBEBEB] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center space-y-6 my-auto py-8">
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
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Enter the email address associated with your account.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left pt-2">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 bg-[#E0E0E3] border ${emailError ? "border-red-500" : "border-gray-300/60"
                } rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all`}
            />
            {/* Requirement error message under input field */}
            {emailError && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {emailError}
              </p>
            )}
          </div>

          {/* Send Reset Link Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            Send Reset Link
          </button>

          {/* Back to Sign In Button */}
          <Link
            href="/auth/login"
            className="block w-full py-3.5 bg-[#E2E2E5] border border-gray-300 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs sm:text-sm text-center transition-all cursor-pointer shadow-2xs"
          >
            Back to Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}