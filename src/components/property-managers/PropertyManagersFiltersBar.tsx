"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyManagersFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  planFilter: string;
  setPlanFilter: (plan: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCount: number;
}

export default function PropertyManagersFiltersBar({
  searchQuery,
  setSearchQuery,
  planFilter,
  setPlanFilter,
  statusFilter,
  setStatusFilter,
  filteredCount,
}: PropertyManagersFiltersBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#EBEBEB] border border-gray-300/60 rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 transition-colors"
          />
        </div>

        {/* Plan Filter Dropdown (shadcn UI Select) */}
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[170px] bg-[#EBEBEB] border-gray-300/60 py-5.5 rounded-md text-xs font-medium text-gray-700 h-12 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Plans">All Plans</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Starter">Starter</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter Dropdown (shadcn UI Select) */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-[#EBEBEB] border-gray-300/60 rounded-md py-5.5 text-xs font-medium text-gray-700 h-[46px] focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Account Count Badge */}
      <div className="text-xs font-medium text-gray-500 shrink-0">
        {filteredCount} accounts
      </div>
    </div>
  );
}
