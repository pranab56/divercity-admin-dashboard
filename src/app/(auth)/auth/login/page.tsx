"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Requirement error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email address is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

    toast.success("Signed in successfully!");
    router.push("/");
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
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Login to your account
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

          {/* Password */}
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
              className={`w-full px-4 py-3 bg-[#E0E0E3] border ${passwordError ? "border-red-[#DC2626]" : "border-gray-300/60"
                } rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all`}
            />
            {/* Requirement error message under input field */}
            {passwordError && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2.5 cursor-pointer select-none font-semibold text-gray-700 group"
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 shadow-2xs ${rememberMe
                  ? "bg-[#57154D] border-[#57154D] text-white"
                  : "bg-white/90 border-gray-300 group-hover:border-[#57154D]"
                  }`}
              >
                {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Remember Password
              </span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="font-bold text-gray-900 hover:underline underline-offset-2"
            >
              Forgot Password
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}