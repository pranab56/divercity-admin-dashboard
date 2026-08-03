"use client";

import React from "react";
import { Search } from "lucide-react";
import { UserRole } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoleFilter: string;
  setSelectedRoleFilter: (role: string) => void;
}

export default function UserFiltersBar({
  searchQuery,
  setSearchQuery,
  selectedRoleFilter,
  setSelectedRoleFilter,
}: UserFiltersBarProps) {
  const roles: ("All" | UserRole)[] = ["All", "Student", "Teacher", "Parent", "Company"];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs"
        />
      </div>

      {/* Right Role Filter Select Dropdown (shadcn Select Component) */}
      <div className="shrink-0 w-full sm:w-auto">
        <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
          <SelectTrigger className="w-full sm:w-[160px] bg-[#F4F4F6] py-5 cursor-pointer sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs focus:ring-2 focus:ring-[#57154D]/30 h-10 px-4">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
            {roles.map((r) => (
              <SelectItem key={r} value={r} className="font-semibold text-xs sm:text-sm cursor-pointer">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
