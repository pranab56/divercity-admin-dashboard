"use client";

import React from "react";
import { PropertySubmission, ReviewStatus } from "./types";

interface PropertyReviewTabsProps {
  activeTab: "All" | ReviewStatus;
  setActiveTab: (tab: "All" | ReviewStatus) => void;
  properties: PropertySubmission[];
}

export default function PropertyReviewTabs({
  activeTab,
  setActiveTab,
  properties,
}: PropertyReviewTabsProps) {
  const tabsList = ["All", "Pending Review", "Approved", "Rejected"] as const;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-300/80 pb-3">
      {tabsList.map((tab) => {
        const count =
          tab === "All"
            ? properties.length
            : properties.filter((p) => p.status === tab).length;
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              isActive
                ? "bg-[#E1D4F4] text-[#8E25E3] border border-purple-300 shadow-2xs"
                : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80 border border-gray-300/50"
            }`}
          >
            <span>{tab}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                isActive ? "bg-[#8E25E3] text-white" : "bg-gray-300 text-gray-800"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
