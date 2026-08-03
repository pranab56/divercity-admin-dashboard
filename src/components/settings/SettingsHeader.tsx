"use client";

import React from "react";
import { Save } from "lucide-react";

interface SettingsHeaderProps {
  onSaveChanges: () => void;
}

export default function SettingsHeader({ onSaveChanges }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Manage platform configuration and preferences
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onSaveChanges}
          className="px-6 py-3 bg-[#57154D] hover:bg-[#47103F] text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4 text-white" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
