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
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Manage platform configuration and preferences
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onSaveChanges}
          className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
