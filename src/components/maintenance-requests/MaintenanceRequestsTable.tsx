"use client";

import React from "react";
import { Eye, MapPin } from "lucide-react";
import { PriorityLevel, ServiceRequestItem } from "./types";

interface MaintenanceRequestsTableProps {
  requests: ServiceRequestItem[];
  handleOpenJobModal: (job: ServiceRequestItem) => void;
}

export default function MaintenanceRequestsTable({
  requests,
  handleOpenJobModal,
}: MaintenanceRequestsTableProps) {
  const getPriorityBadgeStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 border border-red-200/50";
      case "High":
        return "bg-amber-100 text-amber-700 border border-amber-200/50";
      case "Medium":
        return "bg-blue-100 text-blue-700 border border-blue-200/50";
      case "Low":
        return "bg-gray-200 text-gray-700 border border-gray-300/50";
    }
  };

  return (
    <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300/80 text-gray-500 text-xs font-semibold">
              <th className="py-4 px-5 font-medium">ID & Date</th>
              <th className="py-4 px-5 font-medium">Property / Issue</th>
              <th className="py-4 px-5 font-medium">Type</th>
              <th className="py-4 px-5 font-medium">Assigned Contractor</th>
              <th className="py-4 px-5 font-medium">Priority</th>
              <th className="py-4 px-5 font-medium">Status</th>
              <th className="py-4 px-5 font-medium">Pay Rate</th>
              <th className="py-4 px-5 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300/60 text-xs font-medium text-gray-800">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500 font-medium">
                  No service requests matching your criteria.
                </td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-200/50 transition-colors">
                  {/* ID & Date */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-bold text-[#8E25E3] text-sm leading-snug">{item.id}</p>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5">{item.date}</p>
                    </div>
                  </td>

                  {/* Property / Issue */}
                  <td className="py-4 px-5 max-w-xs">
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-snug">{item.property}</p>
                      <p className="text-xs text-gray-700 font-normal truncate mt-0.5">{item.issue}</p>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{item.address}</span>
                      </p>
                    </div>
                  </td>

                  {/* Type Category */}
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 bg-purple-100/80 text-[#8E25E3] rounded-md font-semibold text-[11px] inline-block">
                      {item.type}
                    </span>
                  </td>

                  {/* Assigned Contractor */}
                  <td className="py-4 px-5">
                    <span
                      className={`font-semibold ${item.contractor === "Unassigned" ? "text-amber-600 italic" : "text-gray-900"
                        }`}
                    >
                      {item.contractor}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-block ${getPriorityBadgeStyle(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${item.status === "Completed"
                            ? "bg-emerald-500"
                            : item.status === "In Progress" || item.status === "Assigned"
                              ? "bg-blue-500"
                              : item.status === "Pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                      />
                      <span
                        className={
                          item.status === "Completed"
                            ? "text-emerald-600"
                            : item.status === "In Progress" || item.status === "Assigned"
                              ? "text-blue-600"
                              : item.status === "Pending"
                                ? "text-amber-600"
                                : "text-red-600"
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Pay Rate */}
                  <td className="py-4 px-5">
                    <div>
                      <span className="font-bold text-gray-900 text-sm">
                        ${item.finalPayCalculated ? item.finalPayCalculated.toFixed(0) : item.basePay}
                      </span>
                      {item.rateBonus && (
                        <span className="ml-1 text-[10px] font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
                          {item.rateBonus}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => handleOpenJobModal(item)}
                      className="p-2 bg-white/80 hover:bg-white border border-gray-300/80 rounded-md text-gray-600 hover:text-[#8E25E3] transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="View & Assign Job Rate"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
