"use client";

import React from "react";
import { Search } from "lucide-react";
import { NotificationCategory } from "@/types/notification";

interface NotificationFiltersProps {
  activeTab: NotificationCategory;
  onTabChange: (tab: NotificationCategory) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  unreadCount: number;
}

export default function NotificationFilters({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  unreadCount,
}: NotificationFiltersProps) {
  const tabs: { key: NotificationCategory; label: string; count?: number }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "service_request", label: "Service Requests" },
    { key: "invoice", label: "Invoices" },
    { key: "property", label: "Properties" },
    { key: "system", label: "System" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="relative w-full md:w-5/12">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications..."
          className="w-full pl-10 pr-4 py-3 bg-[#EBEBEB] border border-gray-300/60 rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none transition-colors"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[#E1D4F4] text-[#8E25E3] border border-purple-300 shadow-2xs"
                  : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80 border border-gray-300/50"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-[#8E25E3] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
