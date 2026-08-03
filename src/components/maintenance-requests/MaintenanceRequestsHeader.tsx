"use client";

import React from "react";
import { Plus } from "lucide-react";

interface MaintenanceRequestsHeaderProps {
  onOpenNewRequest: () => void;
}

export default function MaintenanceRequestsHeader({ onOpenNewRequest }: MaintenanceRequestsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
          Service Requests
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Monitor contractor assignments, job statuses, and specialized rates.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenNewRequest}
        className="px-4 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>Create Service Request</span>
      </button>
    </div>
  );
}
