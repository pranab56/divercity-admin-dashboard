"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["2", "3", "1", "5", ""]);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input field
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Code verified successfully!");
    router.push("/auth/reset-password");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center space-y-6 my-auto py-8">
        {/* Centered DIIC Logo */}
        <div className="flex justify-center mb-10">
          <img
            src="/logo/logo.png"
            alt="DIIC Logo"
            className="h-28 sm:h-32 object-contain"
          />
        </div>

        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Verify Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Enter the code sent to your email to reset your password.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* OTP Input Boxes Row */}
          <div className="flex items-center justify-center gap-3">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-12 bg-white/90 border border-gray-300 rounded-lg text-center text-lg font-bold text-gray-900 focus:border-[#57154D] focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none shadow-2xs transition-all"
              />
            ))}
          </div>

          <div className="space-y-3">
            {/* Verify Code Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Verify Code
            </button>

            {/* Back to Sign In Button */}
            <Link
              href="/auth/login"
              className="block w-full py-3.5  border border-gray-300 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs sm:text-sm text-center transition-all cursor-pointer shadow-2xs"
            >
              Back to Sign In
            </Link>
          </div>

          {/* Resend Timer Text */}
          <p className="text-xs font-semibold text-gray-600">
            Resend code in <span className="font-bold text-gray-900">00 : 56</span>
          </p>
        </form>
      </div>
    </div>
  );
}