"use client";

import React from "react";
import { Clock } from "lucide-react";

interface ProviderApplicantsHeaderProps {
  pendingCount: number;
}

export default function ProviderApplicantsHeader({ pendingCount }: ProviderApplicantsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
          Servicer Provider Approvals
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Review and approve contractor applications
        </p>
      </div>

      <div>
        <div className="px-4 py-2 rounded-full bg-amber-100/90 border border-amber-200 text-amber-700 font-medium text-xs flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>{pendingCount} awaiting review</span>
        </div>
      </div>
    </div>
  );
}
