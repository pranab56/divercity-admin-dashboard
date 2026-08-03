"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoicesFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCount: number;
}

export default function InvoicesFilterBar({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  filteredCount,
}: InvoicesFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#EBEBEB] border border-gray-300/60 rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 transition-colors"
          />
        </div>

        {/* Type Filter Dropdown (shadcn UI Select) */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] bg-[#EBEBEB] border-gray-300/60 py-5.5 rounded-md text-xs font-medium text-gray-700 h-12 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Types">All Types</SelectItem>
            <SelectItem value="Income">Income (Rent & Subs)</SelectItem>
            <SelectItem value="Payout">Payout (Contractors & Refunds)</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter Dropdown (shadcn UI Select) */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-[#EBEBEB] border-gray-300/60 rounded-md py-5.5 text-xs font-medium text-gray-700 h-[46px] focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Counter Badge */}
      <div className="text-xs font-medium text-gray-500 shrink-0">
        {filteredCount} transactions
      </div>
    </div>
  );
}
