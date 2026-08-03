"use client";

import React from "react";
import { FilterTab } from "./types";

interface ProviderApplicantsFilterBarProps {
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    actionRequired: number;
    rejected: number;
  };
}

export default function ProviderApplicantsFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  counts,
}: ProviderApplicantsFilterBarProps) {
  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "All", label: "All", count: counts.all },
    { key: "Pending", label: "Pending", count: counts.pending },
    { key: "Approved", label: "Approved", count: counts.approved },
    { key: "Action Required", label: "Action Required", count: counts.actionRequired },
    { key: "Rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-2 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#E1D4F4] text-[#8E25E3] border border-purple-300 shadow-2xs"
                  : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80 border border-gray-300/50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  isActive ? "bg-[#8E25E3] text-white" : "bg-gray-300 text-gray-800"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="w-full md:w-64">
        <input
          type="text"
          placeholder="Search contractors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3.5 bg-[#EBEBEB] border border-gray-300/60 rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 transition-colors"
        />
      </div>
    </div>
  );
}
