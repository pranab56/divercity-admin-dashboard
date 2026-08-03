"use client";

import React from "react";
import { Globe, Shield } from "lucide-react";
import { SettingsTab } from "./types";

interface SettingsTabNavigationProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

export default function SettingsTabNavigation({
  activeTab,
  setActiveTab,
}: SettingsTabNavigationProps) {
  return (
    <div className="lg:col-span-3 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-3 shadow-xs space-y-1.5">
      {/* General Tab */}
      <button
        type="button"
        onClick={() => setActiveTab("General")}
        className={`w-full px-4 py-3 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-3 ${activeTab === "General"
            ? "bg-[#E1D4F4] text-[#8E25E3] shadow-2xs"
            : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
          }`}
      >
        <Globe className={`w-4 h-4 ${activeTab === "General" ? "text-[#8E25E3]" : "text-gray-500"}`} />
        <span>General</span>
      </button>

      {/* Security Tab */}
      <button
        type="button"
        onClick={() => setActiveTab("Security")}
        className={`w-full px-4 py-3 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-3 ${activeTab === "Security"
            ? "bg-[#E1D4F4] text-[#8E25E3] shadow-2xs"
            : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
          }`}
      >
        <Shield className={`w-4 h-4 ${activeTab === "Security" ? "text-[#8E25E3]" : "text-gray-500"}`} />
        <span>Security</span>
      </button>
    </div>
  );
}
