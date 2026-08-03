"use client";

import React from "react";

interface GeneralSettingsTabProps {
  platformName: string;
  setPlatformName: (val: string) => void;
  supportEmail: string;
  setSupportEmail: (val: string) => void;
  emailAddress: string;
  setEmailAddress: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  houseAddress: string;
  setHouseAddress: (val: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function GeneralSettingsTab({
  platformName,
  setPlatformName,
  supportEmail,
  setSupportEmail,
  emailAddress,
  setEmailAddress,
  phoneNumber,
  setPhoneNumber,
  houseAddress,
  setHouseAddress,
  onSave,
}: GeneralSettingsTabProps) {
  return (
    <div className="lg:col-span-9 bg-[#EBEBEB] border border-gray-300/60 rounded-lg p-6 sm:p-8 shadow-2xs">
      <form onSubmit={onSave} className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">General Settings</h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Configure your basic platform preferences
          </p>
        </div>

        {/* Form Inputs Grid with sharp clear borders and brand focus rings */}
        <div className="space-y-5">
          {/* Row 1: Platform Name & Support Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Row 2: Email Address, Phone Number & House Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                House Address
              </label>
              <input
                type="text"
                value={houseAddress}
                onChange={(e) => setHouseAddress(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#57154D]/30 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
