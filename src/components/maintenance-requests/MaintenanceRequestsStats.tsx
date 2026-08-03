"use client";

import React from "react";
import { ServiceRequestItem } from "./types";

interface MaintenanceRequestsStatsProps {
  requests: ServiceRequestItem[];
}

export default function MaintenanceRequestsStats({ requests }: MaintenanceRequestsStatsProps) {
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress" || r.status === "Assigned").length;
  const completedCount = requests.filter((r) => r.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1 */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{totalCount}</h2>
        <p className="text-xs font-medium text-gray-600 mt-2">Total Service Requests</p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-amber-500">{pendingCount}</h2>
        <p className="text-xs font-medium text-gray-600 mt-2">Pending Jobs</p>
      </div>

      {/* Card 3 */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-blue-600">{inProgressCount}</h2>
        <p className="text-xs font-medium text-gray-600 mt-2">In Progress Jobs</p>
      </div>

      {/* Card 4 */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-emerald-600">{completedCount}</h2>
        <p className="text-xs font-medium text-gray-600 mt-2">Completed Jobs</p>
      </div>
    </div>
  );
}
